import React, {Component} from 'react';
import { Button,Nav,Grid,Row,Col ,Modal } from 'react-bootstrap';
import {Link ,browserHistory} from "react-router";
import {addFolder} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';


class NavBar extends Component {
    constructor(props)
    {
      super(props);
      console.log("nav-constructor",this.props.location.pathname);
      this.state={
        showUploadModal:false,
        showCreateModal:false,
        location:this.props.location.pathname
      };
    }

    onDrop (acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      const {location} =this.state;

      acceptedFiles.forEach((file)=>{
        if(location=="/")
        this.createFile('/home/'+file.name);
        else
        this.createFile(location+'/'+file.name);

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
     const value=(document.getElementById('folderName').value);
     const {location}=this.state;
     if(location=="/")
     this.props.addFolder({name:"/home/"+value,img:"./assets/folder.png",type:'folder'});
     else
     this.props.addFolder({name:location+"/"+value,img:"./assets/folder.png",type:'folder'});
     this.close();
   }
   createFile(name)
   {
     this.props.addFolder({name:name,img:"./assets/file.png",type:'file'});


   }

    render() {
      const { listen } = browserHistory;
      listen(location => {
        console.log(location);

          console.log("executing");
        this.setState({
          location:location.hash.substring(1)
        });

      });
      console.log("nav body",this.state.location);

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
           <h3 class="inline">CloudBoost File UI {this.props.params} </h3>
           <div class="inlineRight">
           <img class="inline" onClick={this.open.bind(this,'upload')} src="./assets/fileadd.png" width="30px"/>
           <img  class="inline" onClick={this.open.bind(this,'create')} src="./assets/folderadd.png" width="30px"/>
           <img  class="inline" src="./assets/delete.png" width="40px"/>

           <input type="text" class="inline" placeholder="Search" />
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
