import { baseUrl } from '../config';

export const TRANSACTIONSLOAD = 'TRANSACTIONSLOAD';

const transactionsLoad = list => ({
  type: TRANSACTIONSLOAD,
  list,
});

export const getTransactions = () => async (dispatch, getState) => {
  // const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/transaction/public`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  if (response.ok) {
    const list = await response.json();
    console.log("TRANSACTIONSLOAD:", list);
    dispatch(transactionsLoad(list));
  }
};

export const createLike = (transaction_id, user_id) => async (getState) => {
  // const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/like/${transaction_id}/${user_id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  if (response.ok) {
    const newLike = await response.json();
    console.log("NEWLIKE:", newLike);
    return true;
  }
};

export const destroyLike = (transaction_id, user_id) => async (getState) => {
  // const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/like/unlike/${transaction_id}/${user_id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  if (response.ok) {
    const destroyedLike = await response.json();
    console.log("destroyedLIKE:", destroyedLike);
    return true;
  }
};
