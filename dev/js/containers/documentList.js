import React, {Component} from 'react';
import {
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Nav,
  Glyphicon,
  Modal,
  Button
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteFile} from '../actions/index';
import {Link} from "react-router";
import DropZone from '../containers/dropzone'

class DocumentList extends Component {
  constructor(props)
  {
    super(props);
    console.log("here", this.props.location);
    this.state = {
      docs: this.props.docs,
      isAsc: true,
      nameIcon: "sort",
      location: this.props.location,
      showModal: false,
      document: {}
    };
  }

  componentWillReceiveProps(newProp)
  {
    console.log("here2", newProp.location);
    if (newProp.location !== this.state.location)
      this.setState({location: newProp.location});
    }

  filterDocs(text)
  {
    const {docs} = this.props;
    console.log("text", text);
    if (text == '/') {
      text = "/home";
    }
    if (!text.startsWith('/home')) {
      return [];
    }
    //    console.log(text.split('/').length,text);
    if (text == "/home") {
      return (docs.filter((doc) => {
        let a = doc.title.split('/');
        console.log("A", a.length);
        return (a.length == (3));
      }));
    } else {
      return (docs.filter((doc) => {
        let a = doc.title.split('/');
        let t = text;

        return (doc.title.startsWith(text) && a.length == t.split('/').length + 1);
      }));
    }
  }
  sortByKey(array, key, isAsc) {
    array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      if (isAsc)
        return ((x < y)
          ? -1
          : ((x > y)
            ? 1
            : 0));
      else
        return ((x < y)
          ? 1
          : ((x > y)
            ? -1
            : 0));
      }
    );
  }
  sortDocuments(key) {
    var isAsc = this.state.isAsc;
    this.setState({
      isAsc: !isAsc
    });
    if (key == "title")
      this.setState({
        nameIcon: (isAsc
          ? 'sort-by-alphabet'
          : 'sort-by-alphabet-alt'),
        modifiedIcon: "",
        docs: this.sortByKey(this.props.docs, key, isAsc)
      })
    else
      this.setState({
        modifiedIcon: (isAsc
          ? 'sort-by-order'
          : 'sort-by-order-alt'),
        nameIcon: "",
        docs: this.sortByKey(this.props.docs, key, isAsc)
      })
  }
  openFile(document)
  {
    console.log(document);
    this.setState({showModal: true, document: document})
  }
  close() {
    this.setState({showModal: false});
  }

  render() {
    const {location} = this.state;
    const filteredDocs = this.filterDocs(location);
    if (filteredDocs.length == 0) {
      return (
        <div>
          <DropZone location={this.state.location}/>
        </div>
      );
    }
    return (
      <div>
        <table >
          <tbody>
            <tr >
              <th onClick={this.sortDocuments.bind(this, 'title')}>
                Name
                <Glyphicon glyph={this.state.nameIcon}/>
              </th>
              <th onClick={this.sortDocuments.bind(this, 'modified')}>Modified
                <Glyphicon glyph={this.state.modifiedIcon}/></th>
              <th>Actions</th>
            </tr>
            {filteredDocs.map((doc) => {
              const titleArr = doc.title.split('/');
              const title = titleArr[titleArr.length - 1];
              return (
                <tr key={doc.id} ref="listRow" className="listStyle">
                  <td className="dataStyle">
                    <img src={doc.img} width="30"/> {doc.type == 'file'
                      ? (
                        <Link onClick={this.openFile.bind(this, doc)}>{title}</Link>
                      )
                      : (
                        <Link to={doc.title}>
                          {title}</Link>
                      )
}
                  </td>

                  <td >
                    <a href="#">{new Date(parseInt(doc.modified)).toLocaleString()}</a>
                  </td>
                  <td >
                    <Glyphicon glyph="remove" onClick={this.props.deleteFile.bind(this, doc.id)}/>
                    <Glyphicon glyph="pencil"/>
                    <Glyphicon glyph="download-alt"/>
                  </td>
                </tr>
              )
            })}</tbody>
        </table>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Body >
            <h3>Retrieving File.... {this.state.document.title}
            </h3>

          </Modal.Body>
        </Modal>
      </div>

    );
  }

}

function mapStateToProps(state) {
  return {docs: state.documents};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteFile: deleteFile
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentList);
