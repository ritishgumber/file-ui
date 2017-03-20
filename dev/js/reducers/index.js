import {combineReducers} from 'redux';
import DocumentReducer from './reducer-docs';
import UploadingDocs from './reducer-uploading-docs'

const allReducers = combineReducers({documents: DocumentReducer, uploadingFiles: UploadingDocs});

export default allReducers
