require('dotenv')
const express = require('express');
const bcrypt=require('bcrypt')
const router = express.Router();
const  User =require('../models/user')
const Organization=require('../models/organization')

router.post('/',async (req,res)=>{
    try {
        const { username, email, role, password, orgName } = req.body;
    
        if (!username || !email || !role || !password || !orgName) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'Email already in use' });
        }
        // Check if org exists, else create one
        let organization = await Organization.findOne({ name: orgName });
        if (!organization) {
            organization = new Organization({ name: orgName });
            await organization.save();
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
          username,
          email,
          role,
          password: hashedPassword,
          orgId: organization
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
})

module.exports = router