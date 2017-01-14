import React, {Component} from 'react';
import {
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
    Nav,
    Glyphicon
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import {deleteFile, fetchAllFiles, addItem} from '../actions/index';

import {browserHistory, Link} from "react-router";

class MainBody extends Component {

    constructor(props)
    {
        super(props);
        console.log("mainbody", this.props.routes[1].delete);
        this.state = {
            location: this.props.location.pathname
        };

    }

    render() {
        const {listen} = browserHistory;
        listen(location => {
            console.log(location);
            this.setState({location: location.hash.substring(1)});
        });
        const {location} = this.state;
        const a = location.split("/");
        if (a[0] == "")
            a.splice(0, 1);
        console.log(a);
        let link = "";
        const breadcrumb = a.map((b, i) => {
            link = link + "/" + b;
            return (
                <Link key={i} to={link}>
                    {b}
                    &gt;
                </Link>
            );
        });
        return (
            <div>
                <div>{breadcrumb}</div>
                <DocumentList location={location} delete={this.props.routes[1].delete}/>
            </div>

        );
    }

}
function mapStateToProps(state) {
    return {fetching: state.documents.fetching};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addItem: addItem
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MainBody);
