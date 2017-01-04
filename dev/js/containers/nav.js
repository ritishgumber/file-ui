import React, {Component} from 'react';
import { Navbar,NavItem,NavDropdown,Button,Nav,Grid,Row,Col ,Modal } from 'react-bootstrap';
import {Link } from "react-router";
import {addFolder} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';


class NavBar extends Component {
    constructor(props)
    {
      super(props);
      this.state={
        showUploadModal:false,
        showCreateModal:false
      };
    }

    onDrop (acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      acceptedFiles.forEach((file)=>{
        this.createFile(file.name);
      });
      this.close();
    }


    close() {
   this.setState({
     showUploadModal: false,
     showCreateModal:false });
   }
   open(type) {
     this.setState({ showUploadModal: (type=='upload'?true:false),showCreateModal:(type=='upload'?false:true) });
   }
   addFolder(e){
     console.log(document.getElementById('folderName').value);
    this.props.addFolder({name:document.getElementById('folderName').value,img:"./assets/folder.png",type:'folder'});
    this.close();
   }
   createFile(name)
   {
     this.props.addFolder({name:name,img:"./assets/file.png",type:'file'});


   }

    render() {
      const inline={display:"inline-block",padding:"5px"}
      const inlineRight={display:"inline-block",marginLeft:"30%"}

        return (
          <div className="container header">
          <Nav pullRight >
        <a href="#">Upgrade</a>
        <a href="#">
          <img src="./assets/user-default-image.jpg" width='25'/>
          My Profile
        </a>
        </Nav>
        <div className="container "><Grid>
   		<Row>
        <Col md={2}>
        <div id="logo" >
        <Link to="settings" ><img src="./assets/cblogo.png" width="50"/></Link>

        </div>
        </Col>
   			<Col md={10}>
          <Modal show={this.state.showUploadModal} onHide={this.close.bind(this)}>
          <Modal.Header >
            <Modal.Title>Upload File</Modal.Title>
          </Modal.Header>
          <Modal.Body className="dropBody">
            <Dropzone onDrop={this.onDrop.bind(this)}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showCreateModal} onHide={this.close.bind(this)}>
          <Modal.Header >
            <Modal.Title>Enter Folder name</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <input className="form-control" id="folderName" placeholder="Enter Folder name"/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
            <Button className="btn-primary" onClick={this.addFolder.bind(this)}>Create</Button>

          </Modal.Footer>
        </Modal>
           <h3 style={inline}>CloudBoost File UI {this.props.params} </h3>
           <div style={inlineRight}>
           <img style={inline} onClick={this.open.bind(this,'upload')} src="./assets/fileadd.png" width="30px"/>
           <img  style={inline} onClick={this.open.bind(this,'create')} src="./assets/folderadd.png" width="30px"/>
           <img  style={inline} src="./assets/delete.png" width="40px"/>

           <input type="text" style={inline} placeholder="Search" />
          </div>
         </Col>
   		</Row>

   	   </Grid></div>
        </div> );
    }

}
function mapStateToProps(state) {
    return {
      document: state.activeDoc
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({addFolder: addFolder}, dispatch);
}
export default connect( mapStateToProps,matchDispatchToProps)(NavBar);
