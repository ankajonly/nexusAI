import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { validateSignup, validateLogin } from '../utils/validation.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants.js';

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate input
        const validation = validateSignup({ firstName, lastName, email, password });
        if (!validation.isValid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: ERROR_MESSAGES.VALIDATION_ERROR,
                errors: validation.errors
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({ 
                message: ERROR_MESSAGES.USER_EXISTS 
            });
        }

        // Create new user
        const user = new User({ firstName, lastName, email, password });
        await user.save();

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(HTTP_STATUS.CREATED).json({
            message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
            message: ERROR_MESSAGES.SERVER_ERROR 
        });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        const validation = validateLogin({ email, password });
        if (!validation.isValid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: ERROR_MESSAGES.VALIDATION_ERROR,
                errors: validation.errors
            });
        }

        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
                message: ERROR_MESSAGES.INVALID_CREDENTIALS 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
                message: ERROR_MESSAGES.INVALID_CREDENTIALS 
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(HTTP_STATUS.OK).json({
            message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
            message: ERROR_MESSAGES.SERVER_ERROR 
        });
    }
});

// Get current user
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
            message: ERROR_MESSAGES.SERVER_ERROR 
        });
    }
});

// Logout (frontend deletes token)
router.post('/logout', auth, (req, res) => {
    try {
        res.status(HTTP_STATUS.OK).json({ 
            message: SUCCESS_MESSAGES.LOGOUT_SUCCESS 
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
            message: ERROR_MESSAGES.SERVER_ERROR 
        });
    }
});

export default router;
