import jwt from 'jsonwebtoken';
import config from '../../config/config';

const getToken = (authorizationHeader) => {
  if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer')
    return authorizationHeader.split(' ')[1];
  return null;
};

export default async (req, res, next) => {
  const token = getToken(req.headers.authorization);
  const { jwtSecret, jwtRefreshSecret } = config.app;

  if (token) {
    try {
      const { user } = jwt.verify(token, jwtSecret);
      req.user = user;
    } catch (err) {
      // const refreshToken = req.headers['x-refresh-token'];
      // const newTokens = await refreshTokens(
      //   token,
      //   refreshToken,
      //   models,
      //   jwtSecret,
      //   jwtRefreshSecret
      // );
      // if (newTokens.token && newTokens.refreshToken) {
      //   res.set('Acess-Control-Expose-Headers', 'x-token', 'x-refresh-token');
      //   res.set('x-token', token);
      //   res.set('x-refresh-token', refreshTokens);
      // }
      // req.user = { id: newTokens.userId };
    }
  }
  next();
};
