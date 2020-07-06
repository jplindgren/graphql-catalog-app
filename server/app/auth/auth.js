import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import invalidResponse from '../utils/errors';

export const createTokens = (user, secret, refreshSecret) => {
  const createToken = jwt.sign({ user: { id: user.id } }, secret, {
    expiresIn: '30m',
  });

  const createRefreshToken = jwt.sign({ user: { id: user.id } }, refreshSecret, {
    expiresIn: '30d',
  });

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models, jwtSecret, jwtRefreshSecret) => {
  let userId;
  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) return {};

  const user = await models.User.findOne({ where: { id: userId }, raw: true });
  const refreshSecret = user.password + jwtRefreshSecret;
  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, jwtSecret, refreshSecret);
  return {
    ok: true,
    newToken,
    newRefreshToken,
    userId: user.id,
  };
};

export const tryLogin = async (email, password, models, SECRET, REFRESH_SECRET) => {
  const user = await models.User.findOne({ where: { email }, raw: true });
  if (!user) return invalidResponse('email', 'No user exists for this email');

  const isAuthenticated = await bcrypt.compare(password, user.password);
  if (!isAuthenticated) return invalidResponse('password', 'Invalid password');

  const refreshTokenSecret = user.password + REFRESH_SECRET;

  const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);
  return {
    ok: true,
    token,
    refreshToken,
  };
};
