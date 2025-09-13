const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/me', (req, res) => {
  if (req.user) {
    res.json({ ok: true, user: req.user });
  } else {
    res.status(401).json({ error: { code: 401, message: 'Unauthorized' } });
  }
});

// Initiate Google OAuth login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/', // redirect if login fails
  }),
  (req, res) => {
    // Successful login → Passport has set req.session automatically
    // No need to manually set another cookie

    // Redirect to frontend dashboard
    res.redirect('http://localhost:5173/dashboard'); 
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error('Passport logout error:', err);
      return res.status(500).json({ error: { code: 500, message: 'Logout failed' } });
    }

    req.session.destroy(err => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ error: { code: 500, message: 'Failed to destroy session' } });
      }

      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  });
});

module.exports = router;
