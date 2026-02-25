// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        status,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// 404 handler
export const notFound = (req, res) => {
    res.status(404).json({
        message: 'API endpoint not found',
        path: req.originalUrl
    });
};
