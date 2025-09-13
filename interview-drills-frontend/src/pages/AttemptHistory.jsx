import React, { useEffect, useState } from 'react';
import {auth,api} from '../api/axios';

function AttemptHistory() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/attempts')
      .then((res) => {
        setAttempts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load attempts:', err.response || err);
        setError('Failed to load attempt history.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading attempt history...</p>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Attempt History</h1>

      {attempts.length === 0 ? (
        <p>No attempts found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Drill Title</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Difficulty</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score (%)</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Attempted At</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{attempt.drillId.title}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{attempt.drillId.difficulty}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{attempt.score}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(attempt.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttemptHistory;
