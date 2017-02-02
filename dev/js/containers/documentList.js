import React, {Component} from 'react';
import {
    Glyphicon,
    Modal,
    Button,
    ProgressBar,
    Popover,
    OverlayTrigger
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteFile, fetchAllFiles, sortDocuments, editFile} from '../actions/index';
import {Link, browserHistory} from "react-router";
import DropZone from '../containers/dropzone'
import ReactTooltip from 'react-tooltip';

class DocumentList extends Component {
    constructor(props)
    {
        super(props);
        if (this.props.appInitSuccess) {
            if (!this.props.fetching)
                this.props.fetchAllFiles({path: this.props.location, regex: this.props.regex});
            }
        this.state = {
            docs: this.props.docs,
            isAsc: true,
            location: this.props.location,
            isAscending: true,
            titleSortIcon: '',
            modifiedSortIcon: ''
        };

    }

    componentWillReceiveProps(newProp)
    {

        if (newProp.fileAddSuccess || newProp.percentComplete == 100 || newProp.appInitSuccess) {
            if (!this.props.fetching)
                this.props.fetchAllFiles({path: this.state.location, regex: this.props.regex});
            }
        if (newProp.location !== this.props.location) {
            this.setState({location: newProp.location});
            if (!this.props.fetching)
                this.props.fetchAllFiles({path: newProp.location, skip: 1, regex: this.props.regex});

            }
        }
    handleScroll(scroll) {
        let {scrollTop, scrollHeight} = scroll.target.body;
        if (scrollTop > (scrollHeight - window.innerHeight) * 0.75) {
            if (this.props.selectedPage < this.props.total) {
                if (!this.props.fetching)
                    this.props.fetchAllFiles({
                        path: this.state.location,
                        skip: this.props.selectedPage + 1,
                        fetchMoreFiles: true,
                        regex: this.props.regex
                    });

                }
            }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    sortDocuments(key) {
        this.props.sortDocuments({key: key, isAscending: this.state.isAscending});
        this.state.isAscending = !this.state.isAscending;
        if (this.state.isAscending) {
            if (key == 'title') {
                this.state.titleSortIcon = 'ion-android-arrow-dropup sortIcon';
                this.state.modifiedSortIcon = '';
            } else {
                this.state.titleSortIcon = '';
                this.state.modifiedSortIcon = 'ion-android-arrow-dropup sortIcon';
            }
        } else {
            if (key == 'title') {
                this.state.titleSortIcon = 'ion-android-arrow-dropdown sortIcon';
                this.state.modifiedSortIcon = '';
            } else {
                this.state.titleSortIcon = '';
                this.state.modifiedSortIcon = 'ion-android-arrow-dropdown sortIcon';
            }

        }
        this.setState(this.state);
    }

    deleteFile(id) {
        this.props.deleteFile(id);
    }
    navigate(route, isFile) {
        if (isFile) {
            window.open(route, '_blank');
        } else {
            browserHistory.push(route);
        }
    }
    editFile(id) {
        this.props.editFile(id);
    }
    toggleClass() {
        $(".more-icon").hover(function() {
            $(this).removeClass("ion-ios-more-outline");
            $(this).addClass("ion-ios-more");
        }, function() {
            $(this).removeClass("ion-ios-more");
            $(this).addClass("ion-ios-more-outline");
        });

    }
    formatBytes(bytes, decimals) {
        if (bytes == 0)
            return '0 Bytes';
        var k = 1000,
            dm = decimals + 1 || 3,
            sizes = [
                'Bytes',
                'KB',
                'MB',
                'GB',
                'TB',
                'PB',
                'EB',
                'ZB',
                'YB'
            ],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    closeUploadingStatusRow() {
        console.log('closing');
        $('.uploadingStatusRow').fadeOut();
    }
    renderUploadingStatus() {
        if (this.props.uploading || this.props.uploadFinish)
            if (this.props.uploadFinish) {
                return (
                    <tr className="">
                        <td className="uploadingStatusRow" colSpan="3">
                            <i class="ion ion-android-cloud-done upload-complete-icon"></i>{this.props.totalFiles + ' Files Uploaded Successfully'}
                            <span class="pull-right">
                                <i onClick={this.closeUploadingStatusRow.bind(this)} class="ion ion-ios-close-empty close-icon"></i>
                            </span>
                        </td>
                    </tr>
                )
            }
        else {
            return (
                <tr className="">
                    <td className="uploadingStatusRow" colSpan="3">
                        {this.props.remainingFiles - 1}&nbsp; of {this.props.totalFiles}&nbsp; remaining
                    </td>
                </tr>
            )
        }
    }
    renderRemainingFilesList() {
        if (this.props.up)
            return (this.props.up.map((doc, i) => {
                if (i != 0)
                    return (
                        <tr className=" uploadingList">
                            <td className="dataStyle nameDataField">
                                <img src='/assets/file-types/file.png' width="30"/> {doc.name}
                            </td>
                            <td colSpan="2" class="dataStyle progressBarField">
                                <ProgressBar class="ProgressBar" now={0}/>
                            </td>

                        </tr>
                    )
            }))

            }
    renderUploadingFilesList() {
        if (this.props.uploadingFile)
            return (
                <tr className=" uploadingList">
                    <td className="dataStyle nameDataField">
                        <img src='/assets/file-types/file.png' width="30"/> {this.props.uploadingFile.name}
                    </td>
                    <td colSpan="2" class="dataStyle progressBarField">
                        <ProgressBar class="ProgressBar" now={this.props.uploadProgress}/>
                    </td>

                </tr>
            )
    }

    renderUploadedFilesList() {
        if (this.props.uploadedFiles)
            return (this.props.uploadedFiles.map((doc, i) => {
                let date = new Date(parseInt(doc.createdAt));
                const modified = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
                return (
                    <tr key={'1.' + i} ref="listRow" className="listStyle">
                        <td className="dataStyle nameDataField" onDoubleClick={this.navigate.bind(this, doc.url, true)}>
                            <img src='/assets/file-types/file.png' width="30"/>
                            <span class="name-field">{doc.name}</span>
                        </td>
                        <td class="dataStyle modifiedDataItem">
                            {modified}
                        </td>
                        <td class="dataStyle ">
                            <span data-tip data-for="delete-icon" onClick={this.deleteFile.bind(this, doc._id)} class="ion ion-ios-trash-outline action-icons trash-icon"></span>
                            <ReactTooltip id='delete-icon' place="bottom" effect='solid'>
                                <span>{"Delete "}</span>
                            </ReactTooltip>

                            <a href={doc.url} target="_blank">
                                <span data-tip data-for="download-icon" class="ion ion-ios-download-outline action-icons download-icon"></span>
                            </a>
                            <ReactTooltip id='download-icon' place="bottom" effect='solid'>
                                <span>Download
                                </span>
                            </ReactTooltip>
                            <span data-tip onMouseOver={this.toggleClass.bind(this)} onMouseOut={this.toggleClass.bind(this)} data-for="more-icon" class="ion ion-ios-more-outline action-icons more-icon"></span>
                            <ReactTooltip id='more-icon' place="bottom" effect='solid'>
                                <span>More
                                </span>
                            </ReactTooltip>
                        </td>
                    </tr>

                )
            }))

    }
    selectRow() {
        $('.listStyle').click(function() {
            $(this).addClass('row-selected');
            $(this).siblings().removeClass("row-selected");

        });
    }
    showNameInput() {
        $(".nameInput").keypress(function(e) {
            if (e.key == 'Enter') {
                $(this).css('display', 'none');
                $(this).siblings('span').text($(this)[0].value);
                $(this).siblings('span').css('display', 'inline-block');
            }
        });
        $(".nameInput").focusout(function(e) {
            $('.nameInput').css('display', 'none');
            $('.nameField').css('display', 'inline-block');
        });
        $('.nameField').click(function() {
            $(this).css('display', 'none');
            $(this).siblings('input').css('display', 'inline-block');
            $(this).siblings('input').focus();
        });
    }

    render() {
        const {location} = this.state;

        if (this.props.docs.length == 0 && !this.props.fetching && !this.props.uploading) {
            return (
                <div>
                    No Files FOund, Drag and drop files here.
                </div>
            );
        }
        return (
            <table class="document-list responsive" id="document-list">
                <tbody>
                    <tr class="listHeading">
                        <th class="dataStyle" onClick={this.sortDocuments.bind(this, 'title')}>Name
                            <i class={this.state.titleSortIcon}></i>
                        </th>
                        <th class="dataStyle" onClick={this.sortDocuments.bind(this, 'modified')}>Modified
                            <i class={this.state.modifiedSortIcon}></i>
                        </th>
                        <th class="dataStyle">Actions</th>
                    </tr>
                    {this.renderUploadingStatus()}
                    {this.renderRemainingFilesList()}
                    {this.renderUploadingFilesList()}
                    {this.renderUploadedFilesList()}

                    {this.props.docs.map((doc, i) => {
                        const isFile = (doc.type == 'File'
                            ? true
                            : false);
                        const route = (isFile
                            ? doc.url
                            : this.state.location + '/' + doc.title);
                        const popoverFocus = (
                            <Popover id="popover-trigger-focus" title="More..">
                                <div class="popover-list">Rename</div>
                                <div class="popover-list">ACL</div>
                            </Popover>
                        );
                        return (
                            <tr key={i} ref="listRow" class="listStyle" onClick={this.selectRow.bind(this)}>
                                <td className="dataStyle nameDataField" onDoubleClick={this.navigate.bind(this, route, isFile)}>
                                    <img src={doc.img} width="30"/>
                                    <span class="name-field">
                                        <span class="nameField">{doc.title}</span>
                                        <input autoFocus={true} type="text" defaultValue={doc.title} placeholder="Name" class="input-no-border nameInput"/>
                                    </span>

                                </td>
                                <td class="dataStyle modifiedDataItem">
                                    {doc.modified}
                                </td>
                                <td class="dataStyle ">
                                    <span data-tip data-for="delete-icon" onClick={this.deleteFile.bind(this, doc.id)} class="ion ion-ios-trash-outline action-icons trash-icon"></span>
                                    <ReactTooltip id='delete-icon' place="bottom" effect='solid'>
                                        <span>{"Delete "}</span>
                                    </ReactTooltip>

                                    {doc.type == 'File'
                                        ? <a href={doc.url} target="_blank">
                                                <span data-tip data-for="download-icon" class="ion ion-ios-download-outline action-icons download-icon"></span>
                                            </a>
                                        : null}
                                    <ReactTooltip id='download-icon' place="bottom" effect='solid'>
                                        <span>Download
                                        </span>
                                    </ReactTooltip>

                                    <ReactTooltip id='more-icon' place="bottom" effect='solid'>
                                        <span>More
                                        </span>
                                    </ReactTooltip>
                                </td>
                            </tr>
                        )
                    })}</tbody>
            </table>

        );
    }

}

function mapStateToProps(state) {
    return {
        docs: state.documents.docs,
        percentComplete: state.documents.percentComplete,
        fetching: state.documents.fetching,
        total: state.documents.total,
        regex: state.documents.regex,
        appInitSuccess: state.documents.appInitSuccess,
        uploading: state.documents.uploading,
        uploadingFile: state.uploadingFiles.file,
        uploadProgress: state.uploadingFiles.uploadProgress,
        uploadedFiles: state.uploadingFiles.uploadedFiles,
        up: state.uploadingFiles.up,
        remainingFiles: state.uploadingFiles.remainingFiles,
        totalFiles: state.uploadingFiles.totalFiles,
        uploadFinish: state.uploadingFiles.uploadFinish,
        selectedPage: state.documents.selectedPage
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteFile: deleteFile,
        fetchAllFiles: fetchAllFiles,
        sortDocuments: sortDocuments,
        editFile: editFile

    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentList);
