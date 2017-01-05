import {combineReducers} from 'redux';
import DocumentReducer from './reducer-docs';
import ActiveDocument from './reducer-active-doc';


/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    documents: DocumentReducer,
    activeDoc:ActiveDocument
  });

export default allReducers
