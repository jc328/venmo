import { baseUrl } from '../config';


const TOKEN_KEY = 'zenmo/authentication/token';
const CURRENT_USER = 'CURRENT_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const REMOVE_AUTH = 'REMOVE_AUTH';
export const VAL_ERRORS = 'VAL_ERRORS';


export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const removeAuth = () => ({
  type: REMOVE_AUTH,
});

export const setValErrors = (valErrors) => ({
  type: VAL_ERRORS,
  valErrors
})

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const loadUser = () => async dispatch => {
  const user = JSON.parse(window.localStorage.getItem(CURRENT_USER));
  if (user) {
    dispatch(setUser(user));
  }
};

export const signUp = (firstName, lastName, email, password) => async dispatch => {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (!response.ok) {
      const valErrors = await response.json();
      await dispatch(setValErrors(valErrors))
      return false;
    }
    else {
      const { token, user } = await response.json();
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
      dispatch(setToken(token));
      dispatch(setUser(user))
      return true
    }

  }
  catch (err) {
    console.error(err);
  }
}

export const signIn = (email, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/signin`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    dispatch(setToken(token));
    dispatch(setUser(user));
    return true;
  } else {
    const valErrors = await response.json();
    dispatch(setValErrors(valErrors));
    return false;
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
    window.localStorage.removeItem(CURRENT_USER);
    dispatch(removeAuth())
  }
};
