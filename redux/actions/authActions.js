// src/redux/actions/authActions.js
export const setAuth = (isAuthenticated, user) => ({
    type: 'SET_AUTH',
    payload: { isAuthenticated, user }
  });
  