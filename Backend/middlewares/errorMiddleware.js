class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "internt server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 1100) {
    const message = `Duplicate ${Object.key(err.keyValues)} Enterd`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "json web token in invalid, try again!";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenExpire") {
    const message = "json web token in Expired, try again!";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join("")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
