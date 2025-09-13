import { Link } from 'react-router-dom';    
import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {auth,api} from '../api/axios';

function Navbar() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.post('/logout', {}, { withCredentials: true })
      .then(() => {
        alert('Logged out successfully!');
        setIsLoggedIn(false);
        navigate('/');  // Redirect to login page or home
      })
      .catch((err) => {
        console.error('Logout error:', err.response || err);
        alert('Failed to logout.');
      });
  };

  return (
    <nav style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginRight: '10px' }}>
        Dashboard
      </button>
      <button onClick={() => navigate('/history')} style={{ marginRight: '10px' }}>
        History
      </button>
      {/* <Link to="/history" style={{ marginLeft: '10px' }}>History</Link> */}
      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
