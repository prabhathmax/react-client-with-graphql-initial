import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../src/reducers/CombineReducer';

const middlewares = () => {
  return [thunk].filter(Boolean);
};

export const makeStore = () =>
  createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares())));

export default makeStore();
