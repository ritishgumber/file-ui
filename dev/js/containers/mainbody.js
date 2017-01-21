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
                        <Glyphicon glyph="chevron-right"/>
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
                        <div class="fixed-navbar ">

                            <div >
                                <span class="inlineLeft">
                                    <h4 class=" inline breadcrumb-row">
                                        <a href={'#/' + this.props.appId}>{this.props.appName}
                                            &nbsp;</a>
                                        {breadcrumb}
                                    </h4>
                                </span>
                                <span class="inlineRight">
                                    <a title="ww">
                                        <img class="inline" onClick={this.open.bind(this, 'upload')} src="./assets/fileadd.png" width="25px"/>
                                    </a><img class="inline" onClick={this.open.bind(this, 'create')} src="./assets/folderadd.png" width="25px"/>
                                    <input type="text" class="inline search-bar" onChange={this.handleChange.bind(this)} placeholder="Search"/>
                                </span>
                            </div>

                            <div class="fixed-table-heading ">
                                <div class="row">
                                    <div class="col-md-7 col-lg-7 col-sm-7 col-xs-7 heading-style" onClick={this.sortDocuments.bind(this, 'title')}>
                                        Name &nbsp;<Glyphicon glyph={this.state.titleSortIcon}/>
                                    </div>
                                    <div class="col-md-3  col-lg-3 col-sm-3 col-xs-3 heading-style" onClick={this.sortDocuments.bind(this, 'modified')}>
                                        Modified&nbsp;<Glyphicon glyph={this.state.modifiedSortIcon}/></div>
                                    <div class="col-md-2  col-lg-2 col-sm-2 col-xs-2 heading-style">Action</div>
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
