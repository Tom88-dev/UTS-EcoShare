const { AppError } = require("../services/errors");

function errorHandler(err, req, res, next) {
  void next;

  const appErr =
    err instanceof AppError
      ? err
      : new AppError("INTERNAL_SERVER_ERROR", "Internal server error", 500);

  // eslint-disable-next-line no-console
  if (appErr.statusCode >= 500) console.error(err);

  res.status(appErr.statusCode).json({
    success: false,
    code: appErr.code,
    message: appErr.message,
    details: appErr.details || undefined,
  });
}

module.exports = { errorHandler };

