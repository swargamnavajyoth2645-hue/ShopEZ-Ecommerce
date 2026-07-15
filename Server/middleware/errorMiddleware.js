// Fallback for requests that don't match any routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Global error handler to format messages
const errorHandler = (err, req, res, next) => {
    // Sometimes a bad request still has a 200 status, we want to force it to a 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Only show the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };