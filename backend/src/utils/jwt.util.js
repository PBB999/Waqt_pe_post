const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const createToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, jwtSecret, { expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new Error('Invalid Token');
    }
};

module.exports = { createToken, verifyToken };
