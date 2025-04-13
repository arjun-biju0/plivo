const jwt = require('jsonwebtoken');

function verifyToken  (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer <token>

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded; // { username: 'admin' }
    next();
  });
};
function isAdmin (req, res, next) {
  if (req.user.role !== "admin") {
    console.log("not authorised");
    
    return res.status(403).json({ error: "Admins only" });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};

