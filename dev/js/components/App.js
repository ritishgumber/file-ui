import React from 'react';
import SideBar from '../containers/sidebar';
import MainBody from '../containers/mainbody';
import {initApp} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Dropdown
} from 'react-bootstrap';

class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.props.initApp('' + window.location.pathname.split('/')[1]);
        this.state = {
            scroll: {}
        };

    }
    navigate(route, isReplace) {

        location.assign(route);
    }

    render() {
        let allApps = '';
        const thisObj = this;

        if (this.props.allApps) {
            allApps = this.props.allApps.map((app, i) => {
                if (app.id != thisObj.props.appId)
                    return (
                        <MenuItem key={i} onClick={this.navigate.bind(this, "/" + app.id)}>
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
                            <a class="navbar-brand logo" href={DASHBOARD_URL}><img id="logo" src="/assets/cblogo.png" width="40px"/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={3} title={this.props.appName} id="basic-nav-dropdown">{allApps}</NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem onClick={this.navigate.bind(this, DASHBOARD_URL)}>Dashboard
                            </NavItem>

                            <NavDropdown eventKey={3} title={< img src = "/assets/user-default-image.jpg" class = "profile-photo" />} id="basic-nav-dropdown" class="profile">

                                <MenuItem key={1} onClick={this.navigate.bind(this, DASHBOARD_URL + '/#/profile')}>
                                    View Profile
                                </MenuItem>
                                <MenuItem key={2} onClick={this.navigate.bind(this, '#/')}>
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
                            <NavItem eventKey={2} class="footer-item" onClick={this.navigate.bind(this, 'https://cloudboost.io/')}>Terms</NavItem>
                            <NavItem eventKey={3} class="footer-item" onClick={this.navigate.bind(this, 'https://cloudboost.io/privacy')}>Privacy</NavItem>
                            <NavItem eventKey={4} class="footer-item" onClick={this.navigate.bind(this, 'https://slack.cloudboost.io/')}>Help</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={6} class="footer-item" onClick={this.navigate.bind(this, 'https://tutorials.cloudboost.io/en/datastorage/files#')}>Documentation</NavItem>

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
        initApp: initApp
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);;
