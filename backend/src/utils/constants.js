const STATUS_CODES = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
    INVALID_INPUT: 'Invalid input provided',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    SERVER_ERROR: 'Internal Server Error',
};

const PARCEL_STATUS = {
    CREATED: 'Created',
    PICKED_UP: 'Picked Up',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    FAILED: 'Failed',
};

module.exports = { STATUS_CODES, ERROR_MESSAGES, PARCEL_STATUS };
