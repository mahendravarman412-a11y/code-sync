
const express = require('express');
const axios = require('axios');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const router = express.Router();

const PISTON_API = 'http://127.0.0.1:2000/api/v2';

const languageMap = {
  javascript: 'javascript',
  js: 'javascript',
  java: 'java',
  python: 'python',
  c: 'c',
  cpp: 'c++'
};

function runCommand(command, args, cwd) {
  return new Promise((resolve) => {
    execFile(
      command,
      args,
      {
        cwd,
        timeout: 10000,
        maxBuffer: 1024 * 1024
      },
      (error, stdout, stderr) => {
        resolve({
          stdout: stdout || '',
          stderr: stderr || (error ? error.message : ''),
          code: error
            ? (typeof error.code === 'number' ? error.code : 1)
            : 0,
          signal: error?.signal || null
        });
      }
    );
  });
}

function formatResult(language, result) {
  return {
    language,
    run: {
      ...result,
      output: result.stdout + result.stderr
    }
  };
}

async function executeLocally(language, code) {
  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'codesync-')
  );

  try {
    if (language === 'javascript') {
      const file = path.join(tempDir, 'main.js');

      await fs.writeFile(file, code, 'utf8');

      const result = await runCommand(
        process.execPath,
        [file],
        tempDir
      );

      return formatResult(language, result);
    }

    if (language === 'java') {
      const file = path.join(tempDir, 'Main.java');

      await fs.writeFile(file, code, 'utf8');

      console.log('Compiling Java code...');

      const compile = await runCommand(
        'javac',
        [file],
        tempDir
      );

      if (compile.code !== 0) {
        return formatResult(language, compile);
      }

      console.log('Running Java code...');

      const result = await runCommand(
        'java',
        ['-cp', tempDir, 'Main'],
        tempDir
      );

      return formatResult(language, result);
    }
  } finally {
    await fs.rm(tempDir, {
      recursive: true,
      force: true
    });
  }
}

router.post('/', async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || typeof code !== 'string') {
      return res.status(400).json({
        message: 'Language and code are required'
      });
    }

    const selectedLanguage = languageMap[language.toLowerCase()];

    console.log('Selected language:', selectedLanguage);

    if (!selectedLanguage) {
      return res.status(400).json({
        message: 'Unsupported programming language'
      });
    }

    if (
      selectedLanguage === 'javascript' ||
      selectedLanguage === 'java'
    ) {
      console.log('Running locally:', selectedLanguage);

      const result = await executeLocally(
        selectedLanguage,
        code
      );

      return res.json(result);
    }

    console.log('Sending to Piston:', selectedLanguage);

    const runtimesResponse = await axios.get(
      `${PISTON_API}/runtimes`,
      { timeout: 5000 }
    );

    const runtime = runtimesResponse.data.find(
      (item) => item.language === selectedLanguage
    );

    if (!runtime) {
      return res.status(503).json({
        message: `${language} runtime is unavailable.`
      });
    }

    const executionResponse = await axios.post(
      `${PISTON_API}/execute`,
      {
        language: runtime.language,
        version: runtime.version,
        files: [{ name: 'main', content: code }]
      },
      { timeout: 15000 }
    );

    return res.json(executionResponse.data);

  } catch (error) {
    console.error('Execution error:', error.message);

    return res.status(503).json({
      message: 'Execution service is temporarily unavailable.'
    });
  }
});

module.exports = router;
