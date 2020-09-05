import { baseUrl } from '../config';

export const TRANSACTIONSLOAD = 'TRANSACTIONSLOAD';
export const CHANGE_BALANCE = 'CHANGE_BALANCE'

export const transactionsLoad = list => ({
  type: TRANSACTIONSLOAD,
  list,
});

export const changeBalance = amount => ({
  type: CHANGE_BALANCE,
  amount,
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

export const sendPayment = (amount, message, payer_id, payee_id) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/transaction/pay`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, message, payer_id, payee_id, "completed": true }),
  });

  if (response.ok) {
    return true
  } else {
    return response
  }
}

export const requestPayment = (amount, message, payee_id, payer_id) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/transaction/request`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, message, payee_id, payer_id, "completed": false }),
  });

  if (response.ok) {
    return true
  } else {
    return response
  }
}
