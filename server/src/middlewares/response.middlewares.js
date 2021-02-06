const AppError = require("../Error/AppError");
const HttpStatus = require("http-status-codes");
module.exports = class ResponseMiddlewares {
  static errorHandlerMiddleware(err, req, res, next) {
    console.error("An error occured:", err.message);
    res
      .status(err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message ? err.message : "Something went wrong!",
        data:
          err.stack && req.app.get("env") === "development" ? err.stack : null
      });
  }

  /** Setting Response Data on the response obj and calls next function
   * @param  {} res res Object
   * @param  {} responseData Response Data
   * @param  {} next  Next function
   */
  static sendResponseData(res, status, message, data, next) {
    res.locals.responseObj = {
      status: status,
      message: message,
      data
    };
    next();
  }

  static responseHandlerMiddlware(req, res, next) {
    try {
      res.status(res.locals.responseObj.status).json({
        message: res.locals.responseObj.message,
        data: res.locals.responseObj.data
      });
    } catch (error) {
      next((new AppError().stack = error.stack));
    }
  }
};
