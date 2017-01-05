import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from "react-router";


import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';
import MainBody from './containers/mainbody';
import DocumentList from './containers/documentList';
import Test from './containers/test';


const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MainBody}></IndexRoute>
          <Route path="home/*" name="file" component={MainBody}></Route>
          <Route path="home"  component={MainBody}></Route>

        </Route>
      </Router>
   </Provider>,
    document.getElementById('root')
);
