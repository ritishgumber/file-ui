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
        this.props.addFile({path: location, file: acceptedFiles, data: null, type: null});
        if (this.state.showUploadModal)
            this.props.close()
    }

    componentWillReceiveProps(props) {
        console.log('props', props);
        if (props.fileAddSuccess && props.fileAddSuccess != this.props.fileAddSuccess) {
            setTimeout(function() {
                this.props.close()
            }.bind(this), 1000);
        }
    }

    render() {

        return (
            <Dropzone onDrop={this.onDrop.bind(this)} activeClassName="activeDropBody" className="dropBody" disableClick={this.props.dc}>{this.props.children}</Dropzone>
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
