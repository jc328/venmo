import { baseUrl } from '../config';

export const FRIENDSLOAD = 'FRIENDSLOAD';

const friendsLoad = list => ({
  type: FRIENDSLOAD,
  list,
});

export const getFriends = (userId) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/friends/${userId}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const list = await response.json();
    return list
  }
};
