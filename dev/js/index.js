import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
import MainBody from './containers/mainbody';
import DocumentList from './containers/documentList';

const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(thunk, promise, logger));

ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="*" component={MainBody}></Route>
        </Route>
    </Router>
</Provider>, document.getElementById('root'));
