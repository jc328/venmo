import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER,
  REMOVE_USER,
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

    case REMOVE_TOKEN: {
      const nextState = { ...state };
      delete nextState.token;
      return nextState;
    }

    case REMOVE_USER: {
      const nextState = { ...state };
      delete nextState.user;
      return nextState;
    }
    default: return state;
  }
}

export default authReducer;
