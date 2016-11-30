import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const configureStore = () => {
  const middlewares = [thunk];

  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
