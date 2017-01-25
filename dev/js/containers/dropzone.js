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
            location: this.props.location
        };

    }

    onDrop(acceptedFiles, rejectedFiles) {
        const {location} = this.state;

        let length = acceptedFiles.length;
        this.props.addFile({path: location, file: acceptedFiles, data: null, type: null});
    }

    render() {

        return (
            <div>
                <Dropzone onDrop={this.onDrop.bind(this)} className="dropBody" activeClassName="dropBody2">
                    <img class="center-aligned" src="/assets/emptybox.png"/>
                    <h5 class="center-aligned">Drag and drop files onto this window to upload</h5>
                </Dropzone>
                {this.props.percentComplete
                    ? <ProgressBar now={this.props.percentComplete} label={this.props.percentComplete + '%'}/>
                    : null}
                {this.props.fileAddSuccess
                    ? <h5 class="center-aligned">Upload Complete
                            <i class="ion-android-cloud-done upload-complete-icon"></i>
                        </h5>
                    : null}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {percentComplete: state.documents.percentComplete, fileAddSuccess: state.documents.fileAddSuccess, uploading: state.documents.uploading};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFile: addFile
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DropZone);
