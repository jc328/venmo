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
