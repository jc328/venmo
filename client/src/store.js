import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
};

export default configureStore;
