import React from 'react';
import NavBar from '../containers/nav';
import SideBar from '../containers/sidebar';
import MainBody from '../containers/mainbody';
import axios from 'axios';
import {initApp} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    Row,
    Grid,
    Col,
    Glyphicon,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Dropdown
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
    navigate(route, isReplace) {
        console.log(route);
        if (!isReplace) {
            window.location.href = route;
            location.reload(true);
        } else {
            location.assign(route);
        }
    }
    allApps() {}

    render() {
        let allApps = '';
        const thisObj = this;

        if (this.props.allApps) {
            allApps = this.props.allApps.map((app, i) => {
                if (app.id != thisObj.props.appId)
                    return (
                        <MenuItem key={i} onClick={this.navigate.bind(this, '#/' + app.id, false)}>
                            {app.name}
                        </MenuItem>
                    );
                }
            )
        }

        return (

            <div class="container">
                <Navbar class="navbar-style navbar-border " collapseOnSelect fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a class="navbar-brand logo" href={DASHBOARD_URL}><img id="logo" src="./assets/cblogo.png" width="40px"/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={3} title={this.props.appName} id="basic-nav-dropdown">{allApps}</NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem onClick={this.navigate.bind(this, DASHBOARD_URL, true)}>Dashboard
                            </NavItem>

                            <NavDropdown eventKey={3} title={< img src = "./assets/user-default-image.jpg" class = "profile-photo" />} id="basic-nav-dropdown" class="profile">

                                <MenuItem key={1} onClick={this.navigate.bind(this, DASHBOARD_URL + '/#/profile', true)}>
                                    View Profile
                                </MenuItem>
                                <MenuItem key={2} onClick={this.navigate.bind(this, '#/', false)}>
                                    Logout
                                </MenuItem>
                            </NavDropdown>

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

                <Navbar class="navbar-style navbar-border " collapseOnSelect fixedBottom={true}>
                    <Navbar.Brand>
                        <a class="footer-item" href="https://cloudboost.io">&copy; CloudBoost</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>

                    <Navbar.Collapse>
                        <Nav >
                            <NavItem eventKey={2} class="footer-item" onClick={this.navigate.bind(this, 'https://cloudboost.io/', true)}>Terms</NavItem>
                            <NavItem eventKey={3} class="footer-item" onClick={this.navigate.bind(this, 'https://cloudboost.io/privacy', true)}>Privacy</NavItem>
                            <NavItem eventKey={4} class="footer-item" onClick={this.navigate.bind(this, 'https://slack.cloudboost.io/', true)}>Help</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={6} class="footer-item" onClick={this.navigate.bind(this, 'https://tutorials.cloudboost.io/en/datastorage/files#', true)}>Documentation</NavItem>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {fetching: state.documents.fetching, fileAddSuccess: state.documents.fileAddSuccess, allApps: state.documents.allApps, appName: state.documents.appName, appId: state.documents.appId};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        initApp,
        initApp
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);;
