import { baseUrl } from '../config';
export const CHANGE_BALANCE = 'CHANGE_BALANCE'

export const changeBalance = amount => ({
  type: CHANGE_BALANCE,
  amount,
});

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
