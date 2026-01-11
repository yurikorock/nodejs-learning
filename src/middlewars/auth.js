import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export default async function auth(req, res, next) {
  const { authorization } = req.headers; // отримуємо з хедерс - authorization: 'Bearer 7jKO07hyj7zHj/EooyccgVfARZPWGTaXDTzWcKSI',

  if (typeof authorization !== 'string') {
    throw new createHttpError.Unauthorized('Please provide access token');
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    throw new createHttpError.Unauthorized('Please provide access token');
  }
  // перевіряємо чи є за цим токеном сессія
  const session = await Session.findOne({ accessToken });

  if (session === null) {
    throw new createHttpError.Unauthorized('Session not found');
  }

  // перевіряємо чи не протух токен
  if (session.accessTokenValidUntil < new Date()) {
    throw new createHttpError.Unauthorized('Access token is expired');
  }
  // знаходимо юзера
  const user = await User.findById(session.userId);

  if (user === null) {
    throw new createHttpError.Unauthorized('User not found');
  }

  req.user = { id: user._id, name: user.name }; // вішаємо на реквест юзера,
  // тоді все що після цієї мідлвари зможе використати інформацію про юзера через цю властивість user

  next();
}
