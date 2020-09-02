import {
  SET_TOKEN,
  REMOVE_TOKEN,
} from '../actions/authentication';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const nextState = { ...state };
      delete nextState.token;
      return nextState;
    }

    default: return state;
  }
}

export default authReducer;
