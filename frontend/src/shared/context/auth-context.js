import { createContext } from 'react';

export const AuthContext = createContext({
  userId: null,
  isAuthenticated: false,
  // user: null,
  // token: null,
  login: () => {},
  logout: () => {},
  // register: () => {},
  // updateUser: () => {},
  // updateToken: () => {},
});
