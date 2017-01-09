import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {addFolder} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentList from '../containers/documentList';
import Dropzone from 'react-dropzone';
import {ProgressBar} from 'react-bootstrap'

class DropZone extends Component {
    constructor(props)
    {
        super(props);
        CB.CloudApp.init('xlamefwqcqyd', '0f07bd06-ee6c-4eed-9aa0-fa291747b757');
        this.state = {
            location: this.props.location
        };
        //    this.test();

    }

    addFolder(e) {
        const value = (document.getElementById('folderName').value);
        const {location} = this.state;
        if (location == "/")
            this.props.addFolder({
                name: "/home/" + value,
                img: "./assets/folder.png",
                type: 'folder'
            });
        else
            this.props.addFolder({
                name: location + "/" + value,
                img: "./assets/folder.png",
                type: 'folder'
            });
        }
    createFile(name, url)
    {
        this.props.addFolder({name: name, img: "./assets/file.png", type: 'file', url: url});

    }
    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles);
        console.log('Rejected files: ', rejectedFiles);
        const {location} = this.state;
        //test code

        //test code ends
        let length = acceptedFiles.length;
        acceptedFiles.forEach((file) => {
            var name = file.name;
            var cloudFile = new CB.CloudFile(file);
            const thisPreserved = this;
            cloudFile.save({
                success: function(cloudFile) {
                    length--;
                    //success
                    if (location == "/") {
                        thisPreserved.createFile('/home/' + file.name, cloudFile.document.url);

                    } else {
                        thisPreserved.createFile(location + '/' + file.name, cloudFile.document.url);
                    }
                    if (length == 0)
                        thisPreserved.props.close();
                    }
                ,
                error: function(error) {
                    //error
                },
                uploadProgress: function(percentComplete) {
                    //upload progress.
                    console.log(percentComplete);
                    thisPreserved.state.completed = parseInt(percentComplete * 100);
                    thisPreserved.setState(thisPreserved.state)
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
                <ProgressBar now={this.state.completed} label={this.state.completed + '%'}/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {documents: state.documents};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addFolder: addFolder
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(DropZone);
