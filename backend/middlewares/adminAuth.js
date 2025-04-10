const adminAuth = (req, res, next) => {
    const { username, password } = req.headers;
  
    if (username === 'admin' && password === '1234') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = adminAuth;
  