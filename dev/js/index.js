import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
import MainBody from './containers/mainbody';
import Init from './containers/init';
import DocumentList from './containers/documentList';

const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(thunk, promise, logger));

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={MainBody}></IndexRoute>
            <Route path="/deleted" name="file" delete="true" component={MainBody}></Route>
            <Route path="/:appId/home/*" name="file" component={MainBody}></Route>
            <Route path="/:appId/home" name="file" component={MainBody}></Route>

        </Route>
    </Router>
</Provider>, document.getElementById('root'));
