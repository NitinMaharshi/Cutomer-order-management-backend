class AppError extends Error {
    constructor(statusCode, message, data) {
        super(message)
        this.statusCode = statusCode || 500
        this.data = data || []
    }
}

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = false;
  
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      status: err.status,
      data: err.data || []
    });
  };

module.exports = { AppError, globalErrorHandler}