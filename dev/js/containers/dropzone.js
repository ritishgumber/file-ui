import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {addFolder} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import Dropzone from 'react-dropzone';

class DropZone extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      location: this.props.location
    };
    //    this.test();

  }

  addFolder(e) {
    const value = (document.getElementById('folderName').value);
    const {location} = this.state;
    if (location == "/")
      this.props.addFolder({
        name: "/home/" + value,
        img: "./assets/folder.png",
        type: 'folder'
      });
    else
      this.props.addFolder({
        name: location + "/" + value,
        img: "./assets/folder.png",
        type: 'folder'
      });
    }
  createFile(name)
  {
    this.props.addFolder({name: name, img: "./assets/file.png", type: 'file'});

  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    const {location} = this.state;

    acceptedFiles.forEach((file) => {
      if (location == "/")
        this.createFile('/home/' + file.name);
      else
        this.createFile(location + '/' + file.name);

      }
    );
    this.props.close();
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)} className="dropBody" activeClassName="dropBody2">
          <img src="./assets/dropfile.png"/>
        </Dropzone>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {documents: state.documents};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addFolder: addFolder
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DropZone);
