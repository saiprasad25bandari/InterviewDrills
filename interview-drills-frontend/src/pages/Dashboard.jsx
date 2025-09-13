import React, { useEffect, useState } from 'react';
import {auth,api} from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/drills')
      .then((res) => {
        setDrills(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const msg = err.response?.data?.error?.message || 'Failed to load drills';
        setError(msg);
        setLoading(false);
      });
  }, []);

  const handleTakeDrill = (id) => {
    navigate(`/drill/${id}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading drills...</p>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'red', padding: '20px' }}>Error: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Drills Dashboard</h1>
      {drills.length === 0 ? (
        <p>No drills available.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {drills.map((drill) => (
            <div
              key={drill._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                width: '300px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3>{drill.title}</h3>
              <p><b>Difficulty:</b> {drill.difficulty}</p>
              <p><b>Tags:</b> {drill.tags.join(', ')}</p>
              <button
                onClick={() => handleTakeDrill(drill._id)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Take Drill
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
