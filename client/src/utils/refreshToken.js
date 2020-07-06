import { setToken, clearToken } from './tokens';

const postData = async (url = '', data = {}, additionalHeaders = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      ...additionalHeaders,
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

const refreshAccessToken = async () => {
  const result = await postData(
    'http://localhost:3006/auth/refreshtoken',
    {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    },
    {
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
    }
  );
  const { ok, token, refreshToken } = result;
  if (ok) setToken({ token, refreshToken });
  else clearToken();
  return ok;
};

export default refreshAccessToken;
