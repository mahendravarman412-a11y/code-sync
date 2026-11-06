
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { API_URL } from '../config';

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('Ready to code...');
  const [code, setCode] = useState(
    'console.log("Hello, CodeSync!");'
  );
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    try {
      setLoading(true);
      setOutput('Running your code...');

      const response = await fetch(
        `${API_URL}/api/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            language,
            code
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Execution failed');
      }

      const result = data.run || {};

      setOutput(
        result.output ||
        result.stderr ||
        'Program executed with no output.'
      );

    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      background: '#080b14',
      color: 'white',
      padding: '15px',
      boxSizing: 'border-box',
      fontFamily: 'Arial'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #293047',
        paddingBottom: '12px'
      }}>
        <h2 style={{ color: '#8b7cff' }}>CodeSync®</h2>
        <span>Room: {roomId}</span>
        <button onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
      </header>

      <div style={{
        display: 'flex',
        gap: '10px',
        margin: '15px 0'
      }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '10px',
            background: '#171d2d',
            color: 'white',
            border: '1px solid #343c55',
            borderRadius: '6px'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>

        <button
          onClick={runCode}
          disabled={loading}
          style={{
            background: '#7565ed',
            color: 'white',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Running...' : '▶ Run Code'}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '190px 1fr',
        gap: '12px',
        height: 'calc(100vh - 180px)'
      }}>
        <aside style={{
          background: '#141a2a',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <h3>Explorer</h3>
          <p>📄 main.js</p>
          <p>📁 Project Files</p>
          <hr />
          <h3>Collaborators</h3>
          <p style={{ color: '#9ca3b5' }}>
            Waiting for members...
          </p>
        </aside>

        <main style={{
          display: 'grid',
          gridTemplateRows: 'minmax(250px, 1fr) 130px',
          gap: '10px',
          minWidth: 0
        }}>
          <div style={{
            overflow: 'hidden',
            border: '1px solid #293047',
            borderRadius: '8px'
          }}>
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: true },
                fontSize: 15,
                automaticLayout: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false
              }}
            />
          </div>

          <section style={{
            background: '#141a2a',
            padding: '12px',
            borderRadius: '8px',
            overflow: 'auto'
          }}>
            <h3 style={{ marginTop: 0 }}>
              Output Terminal
            </h3>
            <pre style={{
              color: '#a8b3c7',
              whiteSpace: 'pre-wrap'
            }}>
              {output}
            </pre>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Room;