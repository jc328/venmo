import {
  TRANSACTIONSLOAD
} from '../actions/transactions';

const transactionsReducer = (state = { types: [] }, action) => {
  switch (action.type) {
    case TRANSACTIONSLOAD: {
      return {
        ...state,
        list: action.list,
      };
    }

    default: return state;
  }
}

export default transactionsReducer;