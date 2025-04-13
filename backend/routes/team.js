import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { authMiddleware, isAdmin } from '../middleware/auth';

const router = express.Router();

// Admin adds a team member manually
router.post('/add-member', authMiddleware, isAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  const orgId = req.user.orgId;

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'member',
      orgId
    });

    res.json({ success: true, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
});

export default router;
