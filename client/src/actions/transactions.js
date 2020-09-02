import { baseUrl } from '../config';

export const TRANSACTIONSLOAD = 'TRANSACTIONSLOAD';

const transactionsLoad = list => ({
  type: TRANSACTIONSLOAD,
  list,
});

export const getTransactions = () => async (dispatch, getState) => {
  // const { authentication: { token } } = getState();
  console.log("*** getTransactions ***");
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