import { Router } from 'express';
import { refreshTokens } from './auth';
import models from '../models';
import config from '../../config/config';

const authRouter = Router();

const refreshTokenEndpoint = async (req, res) => {
  const { token, refreshToken } = req.body;
  const result = await refreshTokens(
    token,
    refreshToken,
    models,
    config.app.jwtSecret,
    config.app.jwtRefreshSecret
  );

  const { ok, newToken, newRefreshToken } = result;
  res.send({
    ok,
    token: newToken,
    refreshToken: newRefreshToken,
  });
};

authRouter.post('/refreshToken', refreshTokenEndpoint);

export default authRouter;
