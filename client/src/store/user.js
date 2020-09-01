import { baseUrl } from '../config';

export const signUp = (name, email, password) => async dispatch => {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw response;
    }
    // const { token } = await response.json();
    // localStorage.setItem(TRELLA_TOKEN, token);
    // dispatch(setToken(token));
  }
  catch (err) {
    console.error(err);
  }
}
