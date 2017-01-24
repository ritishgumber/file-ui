import React, {Component} from 'react';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
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
            isAscending: true,
            titleSortIcon: '',
            modifiedSortIcon: ''
        };

    }
    close() {
        this.props.fetchAllFiles({path: this.state.location})
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

    handleChange(e) {
        console.log("value:", e.target.value);
        this.props.fetchAllFiles({path: this.state.location, searchText: e.target.value})
    }
    sortDocuments(key) {
        this.props.sortDocuments({key: key, isAscending: this.state.isAscending});
        this.state.isAscending = !this.state.isAscending;
        if (this.state.isAscending) {
            if (key == 'title') {
                this.state.titleSortIcon = 'chevron-down';
                this.state.modifiedSortIcon = '';
            } else {
                this.state.titleSortIcon = '';
                this.state.modifiedSortIcon = 'chevron-down';
            }
        } else {
            if (key == 'title') {
                this.state.titleSortIcon = 'chevron-up';
                this.state.modifiedSortIcon = '';
            } else {
                this.state.titleSortIcon = '';
                this.state.modifiedSortIcon = 'chevron-up';
            }

        }
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
            if (b != 'home' && i != 0)
                return (
                    <span>
                        <i class="icon ion-chevron-right breadcrumb-color"></i>
                        <Link key={i} to={link}>
                            &nbsp; {b}</Link>
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
                                    <a href={'#/' + this.props.appId}>Home</a>
                                    {breadcrumb}
                                </h4>
                            </span>
                            <span class="inlineRight">
                                <img class="inline" onClick={this.open.bind(this, 'upload')} src="./assets/fileadd.png" width="25px"/>
                                <img class="inline" onClick={this.open.bind(this, 'create')} src="./assets/folderadd.png" width="25px"/>
                                <input type="text" class="inline search-bar" onChange={this.handleChange.bind(this)} placeholder="Search"/>
                            </span>

                            <Modal show={this.state.showUploadModal} onHide={this.close.bind(this)}>
                                <Modal.Header class="modal-header-style">
                                    <Modal.Title class="modal-title-style">
                                        Upload File
                                        <img src="./assets/upload-icon.png" class="modal-icon-style pull-right"></img>
                                        <div class="modal-title-inner-text">Upload as many files you want.</div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <DropZone location={this.state.location} close={this.close.bind(this)}/>

                                </Modal.Body>
                                <Modal.Footer >
                                    <Button onClick={this.close.bind(this)}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={this.state.showCreateModal} onHide={this.close.bind(this)}>
                                <Modal.Header class="modal-header-style">
                                    <Modal.Title>
                                        New Folder
                                        <img src="./assets/add-folder-icon.png" class="modal-icon-style pull-right"></img>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <input className="" id="folderName" placeholder="Enter Folder name"/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.close.bind(this)}>Close</Button>
                                    <Button className="btn-primary create-btn" onClick={this.addFolder.bind(this)}>Create</Button>

                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="col-md-12">
                        <DocumentList location={location}/>

                    </div>
                </div>
            </div>

        );
    }

}
function mapStateToProps(state) {
    return {fetching: state.documents.fetching, fileAddSuccess: state.documents.fileAddSuccess, appName: state.documents.appName, appId: state.documents.appId};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFile: addFile,
        fetchAllFiles: fetchAllFiles,
        sortDocuments: sortDocuments
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MainBody);
