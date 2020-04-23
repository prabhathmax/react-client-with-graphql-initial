import { combineReducers } from 'redux';
import urlReducer from './urlReducer';

const rootReducer = combineReducers({
    url: urlReducer,
});
export default rootReducer;
