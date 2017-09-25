exports.ApiErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    resultCode: '-1000',
    message: err.message,
  })
}
