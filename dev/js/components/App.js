import React from 'react';
import NavBar from '../containers/nav';
import SideBar from '../containers/sidebar';
import MainBody from '../containers/mainbody';
import axios from 'axios';
import {initApp} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory, Link} from "react-router";

import {
    Row,
    Grid,
    Col,
    Glyphicon,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';

const d = {
    position: "fixed"
};
class App extends React.Component {
    constructor(props)
    {
        super(props);
        //console.log(this.props.location);
        console.log();
        this.props.initApp('' + window.location.hash.split('/')[1]);
        this.state = {
            scroll: {}
        };

    }
    navigate(route) {
        browserHistory.push(route);
    }
    allApps() {}

    render() {
        let allApps = '';
        if (this.props.allApps) {
            allApps = this.props.allApps.map((app, i) => {
                return (
                    <MenuItem key={i} onClick={this.navigate.bind(this, '#/' + app.id)}>{app.name}</MenuItem>
                );
            })
        }
        return (

            <div class="container">

                <Navbar class="navbar-style navbar-border container" collapseOnSelect fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a class="navbar-brand logo" href="#"><img id="logo" src="./assets/cblogo.png" width="40px"/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={3} title="All Apps" id="basic-nav-dropdown">{allApps}</NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                <a href="https://tutorials.cloudboost.io/en/datastorage/files#" target="_blank" class="header-elements" id="remove-hover-bg">
                                    &nbsp;Documentation
                                </a>
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                <a href="#" class="header-elements" id="remove-hover-bg">
                                    <img src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png" class="profile-photo" width='24px'/>
                                    &nbsp;My Profile
                                </a>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div class="container">
                    <h3>&nbsp;</h3>
                    <div className="row">
                        <div className="col-sm-2 col-xs-2 col-md-2">
                            <SideBar location={this.props.location}/>
                        </div>
                        <div className="col-sm-10 col-xs-10 col-md-10 container-fluid">
                            {this.props.children}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {fetching: state.documents.fetching, fileAddSuccess: state.documents.fileAddSuccess, allApps: state.documents.allApps};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        initApp,
        initApp
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
