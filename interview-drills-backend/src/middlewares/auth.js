// Real authentication middleware using session (Passport)

async function authMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: { code: 401, message: 'Unauthorized' } });
  }

  next();
}

module.exports = authMiddleware;
