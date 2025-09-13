import React from 'react';

function Landing() {
  const handleGoogleLogin = () => {
    // Redirect user to backend Google OAuth route
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Interview Drills</h1>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Landing;
