// Mock admin routes - for future use
import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// TODO: Add admin authentication middleware
// TODO: Add role-based access control

// Get all users (admin only)
router.get('/users', auth, async (req, res) => {
    try {
        // TODO: Check if user is admin
        const users = await User.find().select('-password');
        res.json({
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Get user by ID (admin only)
router.get('/users/:id', auth, async (req, res) => {
    try {
        // TODO: Check if user is admin
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
});

// Delete user (admin only)
router.delete('/users/:id', auth, async (req, res) => {
    try {
        // TODO: Check if user is admin
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

export default router;
