const tokenKey = 'token';
const refreshTokenKey = 'refreshToken';

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshTokenKey);
};

export const setToken = ({ token, refreshToken }) => {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(refreshTokenKey, refreshToken);
};
