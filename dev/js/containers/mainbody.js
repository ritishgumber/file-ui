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
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class MainBody extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            location: decodeURIComponent(this.props.location.pathname),
            error: {
                folderNameLengthIsZero: false
            }
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
        if (value.length != 0) {
            this.state.error = {
                folderNameLengthIsZero: false
            };
            this.setState(this.state);
            this.props.addFile({path: this.state.location, file: [value], data: 'folder', type: 'folder/folder'});
            this.close();
        } else {
            this.state.error = {
                folderNameLengthIsZero: true
            };
            this.setState(this.state);
        }
    }

    handleChange(e) {
        if (!this.props.fetching)
            this.props.fetchAllFiles({path: this.state.location, searchText: e.target.value, regex: this.props.regex})
    }

    openClick() {
        console.log('yhh');
    }
    animateSearchBox(isFocus) {
        if (isFocus) {
            $('.upload-icon').css({'display': 'none'});
            $('.create-folder-icon').css({'display': 'none'});
            $('.inlineRight').css({'width': '50%'});

        } else {
            $('.upload-icon').css({'display': 'inline-block'});
            $('.create-folder-icon').css({'display': 'inline-block'});
            $('.inlineRight').css({'width': 'initial'});

        }
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
                                <DropZone class="upload-icon" location={this.state.location} disableClick={false}><img data-tip="Upload File" class="inline upload-icon" onClick={this.open.bind(this, 'upload')} src="/assets/fileadd.png" width="25px"/></DropZone>
                                <ReactTooltip place="bottom" effect="solid"/>
                                <img data-tip="New Folder" class="inline create-folder-icon" onClick={this.open.bind(this, 'create')} src="/assets/folderadd.png" width="25px"/>
                                <input type="text" class="inline search-bar" onChange={this.handleChange.bind(this)} placeholder="Search" onFocus={this.animateSearchBox.bind(this, true)} onBlur={this.animateSearchBox.bind(this, false)}/>
                            </span>

                            <Modal show={this.state.showCreateModal} onHide={this.close.bind(this)}>
                                <Modal.Header class="modal-header-style">
                                    <Modal.Title>
                                        <span class="new-folder-modal-title">
                                            New Folder
                                        </span>
                                        <img class="create-folder-modal-icon-style pull-right"></img>
                                        <div class="modal-title-inner-text">Create a new folder.</div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    {this.state.error.folderNameLengthIsZero
                                        ? <span class="error-text">Folder Name is required</span>
                                        : null}
                                    <input className="" id="folderName" placeholder="Enter Folder Name" required={true} minlength="1"/>
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
                        <DocumentList location={location} open={this.openClick.bind(this)}/> {this.props.fetching
                            ? <img src="/assets/fetching.gif" class="fetching-loader"/>
                            : null}
                        <h3>&nbsp;</h3>
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
