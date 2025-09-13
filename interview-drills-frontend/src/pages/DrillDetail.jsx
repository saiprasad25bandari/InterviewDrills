import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {auth,api} from '../api/axios';

function DrillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drill, setDrill] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/drills/${id}`)
      .then((res) => {
        setDrill(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load drill.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== drill.questions.length) {
      alert('Please answer all questions.');
      return;
    }

    const payload = {
      drillId: id,
      answers: Object.entries(answers).map(([qid, text]) => ({
        qid,
        text,
      })),
    };

    setSubmitting(true);

    api.post('/attempts', payload)
      .then(() => {
        alert('Drill submitted successfully!');
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Submission error:', err.response || err);
        alert('Failed to submit drill.');
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading drill...</p>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'red', padding: '20px' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{drill.title}</h1>
      <p><b>Difficulty:</b> {drill.difficulty}</p>

      {drill.questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p><b>Q{index + 1}:</b> {q.prompt}</p>
          <textarea
            rows="4"
            cols="50"
            value={answers[`q${index + 1}`] || ''}
            onChange={(e) => handleChange(`q${index + 1}`, e.target.value)}
            placeholder="Type your answer here..."
            style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#ddd' }}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {submitting ? 'Submitting...' : 'Submit Answers'}
      </button>
    </div>
  );
}

export default DrillDetail;
