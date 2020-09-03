import {
  SET_TOKEN,
  SET_USER,
  REMOVE_AUTH,
  VAL_ERRORS,
} from '../actions/authentication';

const authReducer = (state = {}, action) => {
  let nextState = {...state}
  switch (action.type) {

    case SET_USER: {
      nextState= {...nextState, user: action.user}
      return nextState;
    }

    case SET_TOKEN: {
      nextState= {...nextState, token: action.token}
      return nextState;
    }

    case REMOVE_AUTH: {
      nextState = {};
      return nextState;
    }
    case VAL_ERRORS: {
      nextState = {...nextState, valErrors: action.valErrors}
      return nextState;
    }

    default: return state;
  }
}

export default authReducer;
