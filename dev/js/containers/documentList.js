import React, {Component} from 'react';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteFile, fetchAllFiles, sortDocuments} from '../actions/index';
import {Link} from "react-router";
import DropZone from '../containers/dropzone'
import ReactTooltip from 'react-tooltip';

class DocumentList extends Component {
    constructor(props)
    {
        super(props);
        if (this.props.appInitSuccess) {
            if (!this.props.fetching)
                this.props.fetchAllFiles({path: this.props.location});
            }
        this.state = {
            docs: this.props.docs,
            isAsc: true,
            location: this.props.location,
            selectedPage: 1,
            isAscending: true,
            titleSortIcon: '',
            modifiedSortIcon: ''
        };

    }

    componentWillReceiveProps(newProp)
    {

        if (newProp.fileAddSuccess || newProp.percentComplete == 100 || newProp.appInitSuccess) {
            if (!this.props.fetching)
                this.props.fetchAllFiles({path: this.state.location});
            }
        if (newProp.location !== this.props.location) {
            this.setState({location: newProp.location});
            if (!this.props.fetching)
                this.props.fetchAllFiles({path: newProp.location, skip: 1});
            this.setState({selectedPage: 1})

        }
    }
    handleScroll(scroll) {
        this.setState({scroll: scroll});
        let {scrollTop, scrollHeight} = scroll.target.body;
        if (scrollTop > (scrollHeight - window.innerHeight) * 0.75) {
            if (this.state.selectedPage < this.props.total) {
                if (!this.props.fetching)
                    this.props.fetchAllFiles({
                        path: this.state.location,
                        skip: this.state.selectedPage + 1,
                        fetchMoreFiles: true
                    });
                this.setState({
                    selectedPage: this.state.selectedPage + 1
                })
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
    toggleClass() {
        $(".trash-icon").hover(function() {
            $(this).removeClass("ion-ios-trash-outline");
            $(this).addClass("ion-ios-trash");
        }, function() {
            $(this).removeClass("ion-ios-trash");
            $(this).addClass("ion-ios-trash-outline");
        });
        $(".download-icon").hover(function() {
            $(this).removeClass("ion-ios-download-outline");
            $(this).addClass("ion-ios-download");
        }, function() {
            $(this).removeClass("ion-ios-download");
            $(this).addClass("ion-ios-download-outline");
        });
    }
    deleteFile(id) {
        this.props.deleteFile(id);
    }
    navigate(route, isFile) {
        if (isFile) {
            window.open(route, '_blank');
        } else {
            window.location.href = route;
        }
    }
    render() {
        const {location} = this.state;

        if (this.props.docs.length == 0 && !this.props.fetching) {
            return (
                <div>
                    <DropZone location={this.state.location}/>
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

                    {this.props.docs.map((doc, i) => {
                        const isFile = (doc.type == 'File'
                            ? true
                            : false);
                        const route = (isFile
                            ? doc.url
                            : this.state.location + '/' + doc.title);
                        return (
                            <tr key={i} ref="listRow" className="listStyle">
                                <td className="dataStyle nameDataField" onDoubleClick={this.navigate.bind(this, route, isFile)}>
                                    <img src={doc.img} width="30"/> {doc.title}
                                </td>
                                <td class="dataStyle modifiedDataItem">
                                    {doc.modified}
                                </td>
                                <td class="dataStyle ">
                                    <span data-tip data-for="delete-icon" onClick={this.deleteFile.bind(this, doc.id)} class="ion ion-ios-trash-outline action-icons trash-icon"></span>
                                    <ReactTooltip id='delete-icon' place="bottom" effect='solid'>
                                        <span>{"Delete " + doc.type}</span>
                                    </ReactTooltip>

                                    {doc.type == 'File'
                                        ? <a href={doc.url} target="_blank">
                                                <span data-tip data-for="download-icon" class="ion ion-ios-download-outline action-icons download-icon"></span>
                                            </a>
                                        : null}
                                    <ReactTooltip id='download-icon' place="bottom" effect='solid'>
                                        <span>Download File</span>
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
    return {docs: state.documents.docs, percentComplete: state.documents.percentComplete, fetching: state.documents.fetching, total: state.documents.total, appInitSuccess: state.documents.appInitSuccess};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteFile: deleteFile,
        fetchAllFiles: fetchAllFiles,
        sortDocuments: sortDocuments

    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentList);
