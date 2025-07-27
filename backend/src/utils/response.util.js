const successResponse = (res, data, message = 'Request successful', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const errorResponse = (res, error, message = 'Request failed', statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error.message || error,
    });
};

module.exports = { successResponse, errorResponse };
