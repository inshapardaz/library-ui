import Cookies from 'js-cookie';
import { COOKIE_DOMAIN } from "@/config";

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

export const getUser = () => {
  const userCookie = Cookies.get('user');
  if (userCookie && isJsonString(userCookie)) {
    return JSON.parse(userCookie);
  }

  return null;
};

export const setUser = (user) => {
  Cookies.set('user', JSON.stringify(user), { path: '/', domain: COOKIE_DOMAIN });
};

export const clearUser = () => {
  Cookies.remove('user');
};
