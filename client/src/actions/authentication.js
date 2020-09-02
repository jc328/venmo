import { baseUrl } from '../config';

const TOKEN_KEY = 'zenmo/authentication/token';
const CURRENT_USER = 'zenmo/authentication/user';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    dispatch(setToken(token));
  }
};

export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/session`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken());
  }
};
