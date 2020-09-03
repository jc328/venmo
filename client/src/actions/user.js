import { baseUrl } from '../config';

export const signUp = (firstName, lastName, email, password) => async dispatch => {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (!response.ok) {
      throw response;
    }
  }
  catch (err) {
    console.error(err);
  }
}

export const allUsers = () => async dispatch => {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw response;
    }
    console.log(response.body)
  }
  catch (err) {
    console.error(err);
  }
}
