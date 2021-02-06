module.exports = class AppError extends Error {
  constructor(status = 500, message = "Error Occurred") {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.message = message;
  }
};
