import { baseUrl } from '../config';

const ZENMO_TOKEN = 'ZENMO_TOKEN';
const SET_TOKEN = 'zenmo/authentication/SET_TOKEN';
const REMOVE_TOKEN = 'zenmo/authentication/REMOVE_TOKEN';

export const removeToken = token => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const signIn = (email, password) => async dispatch => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw response;
    } else {
      const { token, user } = await response.json();
      localStorage.setItem(ZENMO_TOKEN, token);
      dispatch(setToken(token));
    }

  }
  catch (err) {
    console.error(err);
  }
}


export const signOut = () => async dispatch => {
  localStorage.removeItem(ZENMO_TOKEN)
  console.log('signed out')
  dispatch(removeToken());
}

export default function reducer(state = {}, action) {
  Object.freeze(state);

  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...newState,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return {
        ...newState,
      };
    }

    default: return state;
  }
}
