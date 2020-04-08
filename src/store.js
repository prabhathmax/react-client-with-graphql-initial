import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '~/reducers/CombineReducer';

const isLocal = window.location.hostname === 'localhost';

if (!isLocal)
  Raven.config('https://994f29befea14fa290b422f2903557bb@sentry.io/1186797').install();

const logError = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (e) {
    console.error(`Error while processing ${action.type}:`, e);
    throw new Error(
      `Error processing action (likely a reducer threw). See console for more info.`,
    );
  }
};

const middlewares = () => {
  return [thunk, !isLocal && createRavenMiddleware(Raven), logError].filter(Boolean);
};

export const makeStore = () =>
  createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares())));

export default makeStore();
