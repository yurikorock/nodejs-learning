
import { isValidObjectId } from 'mongoose';
// import createHttpError from 'http-errors';

export function isValidID(req, res, next) {

  if (isValidObjectId(req.params.id) !== true) {
    return res.status(400).json({ status: 400, message: 'ID is not valid' });
    // або  return next(new createHttpErrors.BadRequest("ID is not valid"))
    // throw createHttpError(400, 'Bad request');
  }

  next();
}
