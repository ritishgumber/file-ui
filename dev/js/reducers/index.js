import {combineReducers} from 'redux';
import DocumentReducer from './reducer-docs';

const allReducers = combineReducers({documents: DocumentReducer});

export default allReducers
