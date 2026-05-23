const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, district } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashed, district: district || 'Nashik' };
  users.push(user);
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Registered successfully', token, user: { id: user.id, name: user.name, email: user.email, district: user.district } });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, district: user.district } });
});

module.exports = router;
