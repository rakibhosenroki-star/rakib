/**
 * MD RAKIB HASAN - AUTH CONTROLLER
 * Admin Login & Password Management
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'rakib_hasan_super_secure_jwt_secret_key_2026_!@#$';
const DEFAULT_USER = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
const DEFAULT_PASS = process.env.DEFAULT_ADMIN_PASSWORD || 'rakib2026';

let inMemoryAdminPass = DEFAULT_PASS;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password.' });
    }

    // Try checking database first
    const dbRes = await query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);
    if (dbRes.rows && dbRes.rows.length > 0) {
      const user = dbRes.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (match) {
        const token = jwt.sign({ id: user.id, username: user.username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({ success: true, token, user: { username: user.username } });
      }
    }

    // Fallback comparison for default / development admin credentials
    if (username === DEFAULT_USER && (password === DEFAULT_PASS || password === inMemoryAdminPass)) {
      const token = jwt.sign({ username: DEFAULT_USER, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ success: true, token, user: { username: DEFAULT_USER } });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin username or password.' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 5) {
      return res.status(400).json({ success: false, message: 'New password must be at least 5 characters.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2', [hashed, req.admin.username]);
    inMemoryAdminPass = newPassword;

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
};

exports.verifyAuth = (req, res) => {
  res.json({ success: true, user: req.admin });
};
