
export const login = (token) =>
  ({ type: 'LOGIN_SUCCESS', payload: token });

export const logout = () =>
  ({ type: 'LOGOUT' });