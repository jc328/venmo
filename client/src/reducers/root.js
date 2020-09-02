import { combineReducers } from 'redux';
import authentication from './authentication';
import transactions from './transactions';

const rootReducer = combineReducers({
  authentication,
  transactions,
});

export default rootReducer;
