import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false, // щоб при валідації всі помилки одразу визначало
      });

      next();
    } catch (error) {
      const errors = error.details.map((detail) => detail.message);
      next(new createHttpError.BadRequest(errors));
    }
  };
}

// відповідь =>  в catch обробляємо цю помилку, щоб дістати details
// [Error [ValidationError]: "name" is required. "year" is required] {
//   _original: { gender: 'female', onDuty: true },
//   details: [
//     {
//       message: '"name" is required',
//       path: [Array],
//       type: 'any.required',
//       context: [Object]
//     },
//     {
//       message: '"year" is required',
//       path: [Array],
//       type: 'any.required',
//       context: [Object]
//     }
//   ]
// }
