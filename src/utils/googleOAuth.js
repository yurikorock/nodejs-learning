import { OAuth2Client } from 'google-auth-library';
import { getEnvVariable } from './getEnvVariable.js';

const googleOAuth2Client = new OAuth2Client({
  clientId: getEnvVariable('GOOGLE_CLIENT_ID'),
  clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
  redirectUri: getEnvVariable('GOOGLE_REDIRECT_URI'),
});
// робимо лінку для гугловського редіректу
export async function getOAuthURL() {
  return googleOAuth2Client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}
// валідуємо код який отрм=имали в строкі браузера
export async function validateCode(code) {
  const response = await googleOAuth2Client.getToken(code); // код одноразовий, треба одразу з ним робити

  return googleOAuth2Client.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  //поверне нам jwt в якому в payload є інформація про користувача і отримуємо ticket
}
