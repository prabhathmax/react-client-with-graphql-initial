import * as React from 'react';
import checkForUpdates from '../utils/checkForUpdates';
// import { trackLocation } from '../utils/google-analytics';
import { Route } from 'react-router-dom';

const getLoc = ({ pathname, search, hash, state }) => {
  return { pathname, search, hash, state };
};

const action = (payload) => ({
  type: 'URL_CHANGE',
  payload,
});

export default function syncHistory(store, history) {
  store.dispatch(action(getLoc(history.location)));

  let hasUpdate = false;
  checkForUpdates(() => {
    hasUpdate = true;
  });

  history.listen((newLocation) => {
    setTimeout(() => {
      // trackLocation(newLocation);
    }, 10);

    if (hasUpdate) {
      window.location.reload(true);
    }

    store.dispatch(action(getLoc(newLocation)));
  });
}

syncHistory.getRouteElement = (store) => {
  let didInit = false;
  return (
    <Route
      render={({ history }) => {
        if (didInit) return null;
        else didInit = true;

        syncHistory(store, history);

        return null;
      }}
    />
  );
};

syncHistory.initialAction = () => action(getLoc(window.location));
