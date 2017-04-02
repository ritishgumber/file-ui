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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36',
    palette: {
        primary1Color: blue500,
        primary2Color: blue500,
        accent1Color: blue500,
        pickerHeaderColor: blue500
    }
});

const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(thunk, promise, logger));

window.onload = () => {
    ReactDOM.render(
        <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="*" component={MainBody}></Route>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));
};
