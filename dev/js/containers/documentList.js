import React, {Component} from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem,Nav,Glyphicon  } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class DocumentList extends Component {
constructor(props)
{
  super(props);
 this.state={
   docs:this.props.documents,isAsc:true,nameIcon:"sort"};
}
  sort(key) {
    var isAsc=this.state.isAsc;
   this.setState({docs:this.props.documents.sort(function(a, b) {
   var x = a[key]; var y = b[key];
   if(isAsc)
   return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   else
   return ((x < y) ? 1 : ((x > y) ? -1 : 0));


 }),
isAsc:!isAsc});
if(key=="title")
this.setState({nameIcon:(isAsc?'sort-by-alphabet':'sort-by-alphabet-alt'),modifiedIcon:"",})
else
this.setState({modifiedIcon:(isAsc?'sort-by-order':'sort-by-order-alt'),nameIcon:""})

  }
    render() {
      var a;
      a=this.props.documents;
        return (
		      <table >
        <tbody><tr  >
          <th onClick={this.sort.bind(this,'title')}>Name <Glyphicon glyph={this.state.nameIcon}/>
</th>
          <th  onClick={this.sort.bind(this,'modified')}>Modified  <Glyphicon glyph={this.state.modifiedIcon}/></th>
          <th>Actions</th>
        </tr>
        {a.map(
        		(doc)=>  {
              return(
              <tr key={doc.id} ref="listRow" className="listStyle"  >
              <td className="dataStyle"><a href="#"><img src={doc.img} width="30"/>  {doc.title}</a></td>
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
        documents: state.documents
    };
}


export default connect(mapStateToProps)(DocumentList);
