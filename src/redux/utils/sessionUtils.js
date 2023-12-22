// sessionUtils.js

import Cookies from 'js-cookie';

const TOKEN_COOKIE_KEY = 'adminToken';

export const setAdminToken = (token) => {
  Cookies.set(TOKEN_COOKIE_KEY, token, { expires: 7 }); // Set the token in a cookie that expires in 7 days (adjust as needed)
};

export const getAdminToken = () => {
  return Cookies.get(TOKEN_COOKIE_KEY);
};

export const removeAdminToken = () => {
  Cookies.remove(TOKEN_COOKIE_KEY);
};
