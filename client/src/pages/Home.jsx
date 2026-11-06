
import '../App.css'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <a href="#" className="logo">
          Code<span>Sync</span><small>®</small>
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="signin-btn">Sign In</Link>
          <Link to="/signup" className="nav-start">Get Started ↗</Link>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <div className="tag">
            <span className="green-dot"></span>
            THE FUTURE OF COLLABORATIVE CODING
          </div>

          <h1>
            Code Together.
            <br />
            <span>Build Together.</span>
          </h1>

          <p className="description">
            Where great developers build great things.
            Collaborate in real time, share ideas, write
            code and bring your vision to life.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Start Coding <span>→</span></button>
            <button className="secondary-btn">Explore Features</button>
          </div>

          <div className="hero-status">
            <div className="avatars">
              <span>M</span><span>A</span><span>J</span>
            </div>
            <p>
              <strong>Developers</strong>
              <br />
              Working together worldwide
            </p>
          </div>
        </div>

        <div className="editor-card">
          <div className="editor-header">
            <div className="window-controls">
              <span></span><span></span><span></span>
            </div>
            <div className="file-name">main.js</div>
            <div className="live-status">● LIVE</div>
          </div>

          <div className="editor-content">
            <div><span className="line">01</span> <b>const</b> team = [</div>
            <div><span className="line">02</span> &nbsp; <i>"Developer 1"</i>,</div>
            <div><span className="line">03</span> &nbsp; <i>"Developer 2"</i>,</div>
            <div><span className="line">04</span> &nbsp; <i>"Developer 3"</i></div>
            <div><span className="line">05</span> ];</div>
            <br />
            <div><span className="line">06</span> <b>function</b> buildTogether() {'{'}</div>
            <div><span className="line">07</span> &nbsp; <b>return</b> <i>"Amazing things!"</i>;</div>
            <div><span className="line">08</span> {'}'}</div>
            <br />
            <div><span className="line">09</span> buildTogether();</div>
          </div>

          <div className="editor-bottom">
            <span>● 3 collaborators online</span>
            <span>JavaScript</span>
          </div>
        </div>
      </main>

      <section className="features" id="features">
        <div className="section-heading">
          <span>POWERFUL FEATURES</span>
          <h2>Everything in one workspace.</h2>
          <p>Built for developers. Designed for collaboration.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Editing</h3>
            <p>Write and edit code simultaneously with your teammates.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⌨</div>
            <h3>Smart Code Editor</h3>
            <p>A powerful coding environment with syntax highlighting.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Team Communication</h3>
            <p>Chat, share ideas and solve problems without leaving your workspace.</p>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>One team. One vision. One workspace.</h2>
        <p>
          CodeSync brings developers together to create,
          collaborate and build without boundaries.
        </p>
      </section>

      <footer id="contact">
        <p>© 2026 CodeSync. Code Together. Build Together.</p>
      </footer>
    </div>
  )
}

export default Home
