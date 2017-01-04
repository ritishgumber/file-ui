import React, {Component} from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem,Nav,Glyphicon  } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from "react-router";


class DocumentList extends Component {
constructor(props)
{
  super(props);
  console.log(this.props.list);
 this.state={docs:this.props.docs,
   isAsc:true,nameIcon:"sort"};
}


sortByKey(array,key,isAsc){
  array.sort(function(a, b) {
  var x = a[key]; var y = b[key];
  if(isAsc)
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  else
  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
});
}
  sortDocuments(key) {
    var isAsc=this.state.isAsc;
    this.setState({isAsc:!isAsc});
    if(key=="title")
    this.setState({nameIcon:(isAsc?'sort-by-alphabet':'sort-by-alphabet-alt'),modifiedIcon:"",docs:this.sortByKey(this.props.docs,key,isAsc)})
    else
    this.setState({modifiedIcon:(isAsc?'sort-by-order':'sort-by-order-alt'),nameIcon:"",docs:this.sortByKey(this.props.docs,key,isAsc)})
  }
    render() {
      var a;
      a=this.props.docs;
        return (
		      <table >
        <tbody><tr  >
          <th onClick={this.sortDocuments.bind(this,'title')}> Name <Glyphicon glyph={this.state.nameIcon}/>
</th>
          <th  onClick={this.sortDocuments.bind(this,'modified')}>Modified  <Glyphicon glyph={this.state.modifiedIcon}/></th>
          <th>Actions</th>
        </tr>
        {a.map(
        		(doc)=>  {
              return(
              <tr key={doc.id} ref="listRow" className="listStyle"  >
              <td className="dataStyle">
                <img src={doc.img} width="30"/>
                <Link to={'home/'+doc.title}>  {doc.title}</Link></td>
              <td ><a href="#">{doc.modified}</a></td>
              <td >
                <Glyphicon glyph="remove"/>
                <Glyphicon glyph="pencil"/>
                <Glyphicon glyph="download-alt"/>
              </td>
                </tr>)
            })}</tbody>
      </table>


    );
    }

}

function mapStateToProps(state) {
    return {
        docs: state.documents
    };
}


export default connect(mapStateToProps)(DocumentList);
