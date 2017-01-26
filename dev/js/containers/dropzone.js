import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {addFile} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import Dropzone from 'react-dropzone';
import {ProgressBar} from 'react-bootstrap'

class DropZone extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            location: this.props.location,
            uploading: false,
            uploadingFiles: []
        };

    }

    onDrop(acceptedFiles, rejectedFiles) {
        const {location} = this.state;

        let length = acceptedFiles.length;
        this.props.addFile({path: location, file: acceptedFiles, data: null, type: null});
        this.state.uploadingFiles = acceptedFiles;
        this.setState(this.state);
    }
    renderUploadingFilesList() {
        if (this.props.uploadingFile)
            return (
                <div>
                    <img src="./assets/file.png" width="30px"/>
                    <a href={this.props.uploadingFile.preview}>{this.props.uploadingFile.name}</a>
                    <ProgressBar class="ProgressBar" now={this.props.uploadProgress} label={this.props.uploadProgress + '%'}/>
                </div>
            )
    }

    componentWillReceiveProps(props) {
        console.log('props', props);
        if (props.fileAddSuccess && props.fileAddSuccess != this.props.fileAddSuccess) {
            setTimeout(function() {
                this.props.close()
            }.bind(this), 1000);
        }
    }

    renderUploadedFilesList() {
        if (this.props.uploadedFiles)
            return (this.props.uploadedFiles.map((file) => {
                return (
                    <div class="uploaded-file-row">
                        <Glyphicon glyph="ok-circle"/>
                        <a href={file.preview}>{file.name}</a>
                    </div>
                )
            }))
    }

    render() {

        if (this.state.uploadingFiles.length == 0)
            return (
                <div>
                    <Dropzone onDrop={this.onDrop.bind(this)} className="dropBody" activeClassName="dropBody2">
                        <img class="center-aligned" src="/assets/emptybox.png"/>
                        <h5 class="center-aligned">Drag and drop files onto this window to upload</h5>
                    </Dropzone>
                </div>
            )
        else
            return (
                <div>
                    {this.renderUploadedFilesList()}
                    {this.renderUploadingFilesList()}
                </div>
            )
    }

}

function mapStateToProps(state) {
    return {
        percentComplete: state.documents.percentComplete,
        fileAddSuccess: state.documents.fileAddSuccess,
        uploading: state.documents.uploading,
        uploadingFile: state.uploadingFiles.file,
        uploadProgress: state.uploadingFiles.uploadProgress,
        uploadedFiles: state.uploadingFiles.uploadedFiles
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFile: addFile
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DropZone);
