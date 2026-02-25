import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import servicesRoutes from './routes/services.js';
import aboutRoutes from './routes/about.js';
import reviewsRoutes from './routes/reviews.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/reviews', reviewsRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API Server is running',
        timestamp: new Date().toISOString(),
        mode: process.env.DB_MODE || 'not connected'
    });
});

// API info
app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        version: '1.0.0',
        endpoints: {
            auth: [
                'POST /api/auth/signup',
                'POST /api/auth/login',
                'POST /api/auth/logout',
                'GET /api/auth/me'
            ],
            user: [
                'GET /api/user/profile',
                'PUT /api/user/profile',
                'POST /api/user/change-password',
                'DELETE /api/user/account'
            ],
            services: [
                'GET /api/services',
                'GET /api/services/:id',
                'POST /api/services/contact',
                'POST /api/services/subscribe/:id'
            ],
            about: [
                'GET /api/about',
                'GET /api/about/team',
                'GET /api/about/values'
            ],
            reviews: [
                'GET /api/reviews',
                'GET /api/reviews/:id',
                'POST /api/reviews'
            ]
        }
    });
});

// 404 handler
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

// Database Connection & Server Start
const startServer = async () => {
    try {
        const dbConnected = await connectDB();
        
        if (!dbConnected) {
            console.error('Failed to connect to database. Exiting...');
            process.exit(1);
        }

        app.listen(PORT, () => {
            console.log(`\n${'='.repeat(50)}`);
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📡 Health check: http://localhost:${PORT}/health`);
            console.log(`📚 API info: http://localhost:${PORT}/api`);
            console.log(`${'='.repeat(50)}\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
