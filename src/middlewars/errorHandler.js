import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  //щоб розділити помилки від Http-errors та інші помилки
  if (isHttpError(error)) {
    return res
      .status(error.statusCode)
      .json({ status: error.statusCode, message: error.message });
  }
  
  console.error(error);

  res.status(500).json({ status: 500, message: 'Internal Server Error' });
}
