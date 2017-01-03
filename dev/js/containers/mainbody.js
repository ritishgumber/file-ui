import React, {Component} from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem,Nav,Glyphicon  } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
class MainBody extends Component {

    render() {
        return (
		<div>
      <DocumentList/>
    </div>


    );
    }

}
// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        documents: state.documents
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
/*function matchDispatchToProps(dispatch){
    return bindActionCreators({documents: documents}, dispatch);
}*/

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps)(MainBody);
