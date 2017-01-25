import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {fetchAllFiles, addFile} from '../actions/index';
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
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
        const {location} = this.state;

        let length = acceptedFiles.length;
        acceptedFiles.forEach((file) => {
            this.props.addFile({path: location, file: file, data: null, type: null});
        });
        this.props.close();
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
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {percentComplete: state.documents.percentComplete, fileAddSuccess: state.documents.fileAddSuccess};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllFiles: fetchAllFiles,
        addFile: addFile
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DropZone);
