require('dotenv')
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt=require('bcrypt');
const  User =require('../models/user')

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password){
      return res.status(400).json({ message: 'Email and password required' });
  }

  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).json({ error: "User not found" });
    
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role,
    orgId: user.orgId
  }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
});


module.exports = router;
