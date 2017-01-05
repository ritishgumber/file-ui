import React, {Component} from 'react';
import { Glyphicon  } from 'react-bootstrap';
import { browserHistory,Link } from 'react-router';
import {getFolderFiles} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';


 class Test extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      location:this.props.location.pathname
    };
//    this.test();

  }
  componentWillMount()
  {
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
    this.setState({a:a});
    console.log(a);
        }

  test()
  {
    this.props.getFolderFiles('interface.png');
  }
  getBreadCrumb(){
    const {a}=this.state;
    return(
      a.map((b)=><Link to={'/'+b}>  {b} &gt; </Link> )
    );
  }
  filterDocs()
  {
    const {documents}=this.props;

    console.log(documents.filter((doc)=>doc.title!=''));
}
    render() {
      return (<div>
            {this.getBreadCrumb()}
            <hr/>
            {this.filterDocs()}
          </div>);
    }

}

function mapStateToProps(state) {
    return {
      documents: state.documents
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({getFolderFiles: getFolderFiles}, dispatch);
}
export default connect( mapStateToProps,matchDispatchToProps)(Test);
