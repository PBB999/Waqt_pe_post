const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response.util');
const env = require('../config/env');

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return errorResponse(res, null, 'Access denied. No token provided.', 403);

            const decoded = jwt.verify(token, env.jwtSecret);
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return errorResponse(res, null, 'Access denied. Role not authorized.', 403);
            }
            next();
        } catch (error) {
            errorResponse(res, error, 'Invalid token.', 403);
        }
    };
};

module.exports = authMiddleware;
