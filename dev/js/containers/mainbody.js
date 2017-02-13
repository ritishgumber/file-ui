import React, {Component} from 'react';
import {Tabs, Tab, Modal, Button, ProgressBar} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import {deleteFile, fetchAllFiles, addFile, sortDocuments} from '../actions/index';
import DropZone from './dropzone';
import Dropzone from 'react-dropzone';
import {browserHistory, Link} from "react-router";
import ReactTooltip from 'react-tooltip';

class MainBody extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            location: decodeURIComponent(this.props.location.pathname)
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
        this.props.addFile({path: this.state.location, file: [value], data: 'folder', type: 'folder/folder'});
        this.close();
    }

    handleChange(e) {
        if (!this.props.fetching)
            this.props.fetchAllFiles({path: this.state.location, searchText: e.target.value, regex: this.props.regex})
    }

    openClick() {
        console.log('yhh');
    }

    render() {

        const {listen} = browserHistory;
        listen(location => {
            this.setState({
                location: decodeURIComponent(location.pathname)
            });
        });
        const {location} = this.state;
        const a = location.split("/");
        if (a[0] == "")
            a.splice(0, 1);
        let link = "";
        const breadcrumb = a.map((b, i) => {
            link = link + "/" + b;
            if (b != 'home' && i != 0)
                return (
                    <span>&nbsp;
                        <i class="icon ion-chevron-right breadcrumb-color"></i>
                        <Link key={i} to={link}>
                            {b}</Link>
                    </span>
                );
            }
        );

        return (
            <div class="">
                <div class="row-fluid">
                    <div className=" col-md-12 ">
                        <div class="below-navbar ">

                            <span class="inlineLeft">
                                <h4 class=" inline breadcrumb-row">
                                    <Link to={"/" + this.props.appId}>Home</Link>
                                    {breadcrumb}
                                </h4>
                            </span>
                            <span class="inlineRight">
                                <DropZone class="upload-icon" location={this.state.location} disableClick={false}><img data-tip="Upload File" class="inline" onClick={this.open.bind(this, 'upload')} src="/assets/fileadd.png" width="25px"/></DropZone>
                                <ReactTooltip place="bottom" effect="solid"/>
                                <img data-tip="New Folder" class="inline" onClick={this.open.bind(this, 'create')} src="/assets/folderadd.png" width="25px"/>
                                <input type="text" class="inline search-bar" onChange={this.handleChange.bind(this)} placeholder="Search"/>
                            </span>

                            <Modal show={this.state.showCreateModal} onHide={this.close.bind(this)}>
                                <Modal.Header class="modal-header-style">
                                    <Modal.Title>
                                        New Folder
                                        <img src="/assets/add-folder-icon.png" class="modal-icon-style pull-right"></img>
                                        <div class="modal-title-inner-text">Create a new folder.</div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <input className="" id="folderName" placeholder="Enter Folder Name"/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="btn-primary create-btn" onClick={this.addFolder.bind(this)}>Create</Button>

                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="col-md-12">
                        <DropZone location={this.state.location} disableClick={true}>

                            <DocumentList location={location} open={this.openClick.bind(this)}/> {this.props.fetching
                                ? <img src="/assets/fetching.gif" class="fetching-loader"/>
                                : null}
                            <h3>&nbsp;</h3>
                        </DropZone>
                    </div>
                </div>
            </div>

        );
    }

}
function mapStateToProps(state) {
    return {
        fetching: state.documents.fetching,
        fileAddSuccess: state.documents.fileAddSuccess,
        appName: state.documents.appName,
        appId: state.documents.appId,
        uploadingFile: state.uploadingFiles.file,
        uploadProgress: state.uploadingFiles.uploadProgress,
        uploadedFiles: state.uploadingFiles.uploadedFiles
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFile: addFile,
        fetchAllFiles: fetchAllFiles,
        sortDocuments: sortDocuments
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MainBody);
