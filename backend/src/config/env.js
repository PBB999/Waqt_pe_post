require('dotenv').config();

const env = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    logLevel: process.env.LOG_LEVEL || 'info',
    rateLimitWindow: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
    rateLimitMaxRequests: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
};

module.exports = env;
