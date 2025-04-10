require('dotenv')
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.USER && password === process.env.PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
