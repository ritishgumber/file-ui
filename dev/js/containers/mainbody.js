import React, {Component} from 'react';
import {Nav, Glyphicon, Modal, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import {deleteFile, fetchAllFiles, addFile, sortDocuments} from '../actions/index';
import DropZone from './dropzone';
import {browserHistory, Link} from "react-router";

class MainBody extends Component {

    constructor(props)
    {
        super(props);
        console.log("mainbody", this.props.routes[1].delete);
        this.state = {
            location: this.props.location.pathname,
            isAscending: true
        };

    }
    close() {
        this.setState({showUploadModal: false, showCreateModal: false});
    }
    open(type) {
        this.setState({
            showUploadModal: (type == 'upload'
                ? true
                : false),
            showCreateModal: (type == 'upload'
                ? false
                : true)
        });
    }
    addFolder(e) {
        const value = (document.getElementById('folderName').value);
        this.props.addFile({path: this.state.location, file: value, data: 'folder', type: 'folder'});

        this.close();
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.fileAddSuccess)
            this.props.fetchAllFiles({path: this.state.location});
        }
    handleChange(e) {
        console.log("value:", e.target.value);
        this.props.fetchAllFiles({path: this.state.location, searchText: e.target.value})
    }
    sortDocuments(key) {
        this.props.sortDocuments({key: key, isAscending: this.state.isAscending});
        this.state.isAscending = !this.state.isAscending;
        this.setState(this.state);
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
            if (b != 'home')
                return (
                    <Link key={i} to={link}>
                        {b}
                        &gt;
                    </Link>
                );
            }
        );
        return (
            <div class="row-fluid">
                <div className=" col-md-12 ">
                    <div class="fixed-navbar" id="nabar">
                        <div class="header-row ">
                            <a href="#" class="header-elements">
                                <img src="./assets/upgrade.png" width="15px"/>
                                &nbsp;Upgrade account&nbsp;&nbsp;
                            </a>
                            <a href="#" class="header-elements">
                                <img src="./assets/notification.png" width="15px"/>
                            </a>
                            <a href="#" class="header-elements">
                                <img src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png" class="profile-photo" width='24px'/>
                                &nbsp;My Profile
                            </a>
                        </div>
                        <div >
                            <span class="inlineLeft">
                                <h4 class=" inline breadcrumb-row">
                                    <a href="#">CloudBoost &nbsp;</a>
                                    {breadcrumb}
                                </h4>
                            </span>
                            <span class="inlineRight">
                                <img class="inline" onClick={this.open.bind(this, 'upload')} src="./assets/fileadd.png" width="30px"/>
                                <img class="inline" onClick={this.open.bind(this, 'create')} src="./assets/folderadd.png" width="30px"/>
                                <img class="inline" src="./assets/delete.png" width="35px"/>

                                <input type="text" class="inline search-bar" onChange={this.handleChange.bind(this)} placeholder="Search"/>
                            </span>
                        </div>

                        <div class="fixed-table-heading ">
                            <div class="row">
                                <div class="col-md-7 heading-style" onClick={this.sortDocuments.bind(this, 'title')}>Name</div>
                                <div class="col-md-3 heading-style" onClick={this.sortDocuments.bind(this, 'modified')}>Modified</div>
                                <div class="col-md-2 heading-style">Action</div>
                            </div>
                        </div>
                        <Modal show={this.state.showUploadModal} onHide={this.close.bind(this)}>
                            <Modal.Header >
                                <Modal.Title>Upload File</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <DropZone location={this.state.location} close={this.close.bind(this)}/>

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

                    </div>
                </div>
                <div class="col-md-12">
                    <DocumentList location={location}/>

                </div>
            </div>

        );
    }

}
function mapStateToProps(state) {
    return {fetching: state.documents.fetching};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFile: addFile,
        fetchAllFiles: fetchAllFiles,
        sortDocuments: sortDocuments
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MainBody);
