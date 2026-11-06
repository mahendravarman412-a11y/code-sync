
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [roomId, setRoomId] = useState('');

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (!roomId.trim()) {
      alert('Please enter a Room ID');
      return;
    }
    navigate(`/room/${roomId.trim()}`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080b14',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '30px'
    }}>

      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #252b3b',
        paddingBottom: '20px'
      }}>
        <h2 style={{ color: '#8b7cff' }}>
          CodeSync®
        </h2>

        <button onClick={logout} style={{
          background: '#252b3b',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </nav>

      <main style={{
        maxWidth: '1000px',
        margin: '70px auto'
      }}>
        <h1 style={{ fontSize: '36px' }}>
          Welcome back, {user.name || 'Developer'}!
        </h1>

        <p style={{ color: '#9ca3b5', fontSize: '16px' }}>
          Code Together. Build Together.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '25px',
          marginTop: '45px'
        }}>

          <section style={{
            background: '#141a2a',
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid #292f46'
          }}>
            <h2>Create a Room</h2>
            <p style={{ color: '#9ca3b5' }}>
              Start a new collaborative coding session.
            </p>

            <button onClick={createRoom} style={{
              width: '100%',
              padding: '14px',
              background: '#7565ed',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              + Create New Room
            </button>
          </section>

          <section style={{
            background: '#141a2a',
            padding: '30px',
            borderRadius: '16px',
            border: '1px solid #292f46'
          }}>
            <h2>Join a Room</h2>
            <p style={{ color: '#9ca3b5' }}>
              Enter a Room ID to join your team.
            </p>

            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '13px',
                marginTop: '12px',
                background: '#080b14',
                color: 'white',
                border: '1px solid #353c54',
                borderRadius: '8px'
              }}
            />

            <button onClick={joinRoom} style={{
              width: '100%',
              padding: '14px',
              background: '#252b3b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '12px'
            }}>
              Join Room
            </button>
          </section>

        </div>

        <p style={{
          color: '#606b83',
          textAlign: 'center',
          marginTop: '70px'
        }}>
          CodeSync® — Real-Time Collaborative Code Editor
        </p>
      </main>
    </div>
  );
}

export default Dashboard;
