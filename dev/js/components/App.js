import React from 'react';
import SideBar from '../containers/sidebar';
import MainBody from '../containers/mainbody';
import {initApp} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, Dropdown} from 'react-bootstrap';
import {DropDownMenu, MenuItem, Divider} from 'material-ui';
import _ from 'underscore';
import Header from './header';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

const styles = {
    customWidth: {
        width: 200
    }
};

class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.props.initApp('' + window.location.pathname.split('/')[1]);
        this.state = {
            scroll: {},
            value: 1
        };

    }

    navigate(route, opts) {
        if (opts) {
            browserHistory.push(route);
            this.props.initApp('' + window.location.pathname.split('/')[1]);
        } else {
            window.open(route, '_blank');
        }
    }

    setImgFallbackUrl(e) {
        e.target.onError = null;
        e.target.src = '/assets/default-app-icon.png';
    }
    handleChange = (event, index, value) => this.setState({value});

    render() {
        let allApps = '';
        const thisObj = this;

        if (this.props.allApps) {
            allApps = this.props.allApps.map((app, i) => {
                let label = (
                    <div>
                        <img height="20px" class="app-selector-img" src={SERVER_URL + '/appfile/' + app.id + '/icon'} onError={this.setImgFallbackUrl.bind(this)}></img>
                        {app.name}</div>
                );
                return (
                    <MenuItem className={app.id === thisObj.props.appId
                        ? 'selected-app app-list-item'
                        : 'app-list-item'} innerDivStyle={{
                        "display": "inline-flex",
                        "alignItems": "center"
                    }} value={i} primaryText={app.name} key={i} onClick={this.navigate.bind(this, '/' + app.id, true)} label={label}>
                        <img height="20px" class="app-selector-img" src={SERVER_URL + '/appfile/' + app.id + '/icon'} onError={this.setImgFallbackUrl.bind(this)}></img>
                    </MenuItem>
                );
            })
        }
        let profilePic = <i class="ion ion-person profile-icon"></i>
        if (this.props.userProfilePic) {
            profilePic = <img src={this.props.userProfilePic} class="profilePic"></img>
        }
        const myAppsTitle = (
            <span >
                <i class="ion ion-android-cloud"></i>&nbsp; {this.props.appName
}
            </span>
        );
        let value = 0
        if (this.props.allApps) {
            value = _.pluck(this.props.allApps, 'id').indexOf(this.props.appId);
        }
        return (

            <div>
                <Header/>
                <div class="container">
                    <h3>&nbsp;</h3>
                    <div className="row">
                        <div className=" col-md-2 hidden-xs hidden-sm">
                            <SideBar location={this.props.location}/>
                        </div>
                        <div className="col-sm-10 col-xs-10 col-md-10 container-fluid">
                            {this.props.children}
                        </div>

                    </div>
                </div>

                <Navbar class="navbar-style navbar-border " collapseOnSelect fixedBottom={true}>
                    <Navbar.Brand>
                        <a class="footer-item" href="https://cloudboost.io">&copy; {(new Date()).getFullYear()}&nbsp; CloudBoost</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>

                    <Navbar.Collapse>
                        <Nav >
                            <NavItem eventKey={2} class="footer-item" href='https://cloudboost.io/terms' onClick={this.navigate.bind(this, 'https://cloudboost.io/terms', false)}>Terms</NavItem>
                            <NavItem eventKey={3} class="footer-item" onClick={this.navigate.bind(this, 'https://cloudboost.io/privacy', false)} href='https://cloudboost.io/privacy'>Privacy</NavItem>
                            <NavItem eventKey={4} class="footer-item" onClick={this.navigate.bind(this, 'https://slack.cloudboost.io/', false)} href='https://slack.cloudboost.io/'>Help</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={6} class="footer-item" onClick={this.navigate.bind(this, 'https://tutorials.cloudboost.io/en/datastorage/files#', false)} href='https://tutorials.cloudboost.io/en/datastorage/files#'>Documentation</NavItem>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fetching: state.documents.fetching,
        fileAddSuccess: state.documents.fileAddSuccess,
        allApps: state.documents.allApps,
        appName: state.documents.appName,
        appId: state.documents.appId,
        userProfilePic: state.documents.userProfilePic
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        initApp: initApp
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
