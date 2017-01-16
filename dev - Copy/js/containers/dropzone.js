import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {fetchAllFiles} from '../actions/index';
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
        //    this.test();

    }

    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
        const {location} = this.state;

        let length = acceptedFiles.length;
        acceptedFiles.forEach((file) => {
            let path = "/";
            if (location == "/") {
                path = "/home";
            } else {
                path = location;
            }
            var cloudFile = new CB.CloudFile(file, null, null, path);
            const thisObj = this;
            cloudFile.save({
                success: function(cloudFile) {
                    length--;
                    thisObj.props.fetchAllFiles({path: thisObj.state.location});

                    if (length == 0)
                        thisObj.props.close();
                    }
                ,
                error: function(error) {
                    //error
                },
                uploadProgress: function(percentComplete) {
                    //upload progress.
                    console.log(percentComplete);
                    thisObj.state.completed = parseInt(percentComplete * 100);
                    thisObj.setState(thisObj.state)
                }
            });

        });
    }

    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop.bind(this)} className="dropBody" activeClassName="dropBody2">
                    <img src="./assets/dropfile.png"/>
                </Dropzone>

                {this.state.completed
                    ? <ProgressBar now={this.state.completed} label={this.state.completed + '%'}/>
                    : null}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {documents: state.documents};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllFiles: fetchAllFiles
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DropZone);
