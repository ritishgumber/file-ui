import React, {Component} from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem,Nav,Glyphicon  } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import { browserHistory,Link } from "react-router";

class MainBody extends Component {

  constructor(props)
  {
    super(props);
    console.log("mainbody",this.props.routes[1].delete);
    this.state={
      location:this.props.location.pathname
    };

  }


    render() {
      const { listen } = browserHistory;
      listen(location => {
        console.log(location);
        this.setState({
          location:location.hash.substring(1)
        });
      });
      const {location}=this.state;
      const a=location.split("/");
      if(a[0]=="")
      a.splice(0,1);
      console.log(a);
      let link="";
      const breadcrumb =a.map((b)=>{
      link=link+"/"+b;
      return(<Link to={link}>  {b} &gt; </Link> );});
        return (
		<div>
      <div>{breadcrumb}</div>
      <div id="demo"></div>
      <DocumentList location={location} delete={this.props.routes[1].delete}/>
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
