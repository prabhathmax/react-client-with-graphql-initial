const initialState = {
  pathname: null,
  search: null,
  hash: null,
  state: null,
};

export default function urlReducer(state = initialState, action) {
  if (action.type === 'URL_CHANGE') {
    const { pathname, search, hash, state } = action.payload;
    return { pathname, search, hash, state };
  }

  return state;
}
