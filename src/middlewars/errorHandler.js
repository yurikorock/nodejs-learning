export function errorHandler(error, req, res, next) {
    console.log("Error Handler");
  console.error(error);

  res.status(500).json({ status: 500, message: 'Internal Server Error' });
}
