import { useState, useEffect } from 'react';
import { auth } from '../api/axios';  // Auth axios instance

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    console.log('Checking auth status...');
    auth.get('/me')
      .then((res) => {
        console.log('Auth response:', res.data);
        if (res.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Auth check failed:', err);
        setIsLoggedIn(false);
        setLoading(false);
      });
  }, []);

  return { isLoggedIn, loading };
}

export default useAuth;
