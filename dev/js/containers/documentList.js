import React, {Component} from 'react';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteFile, fetchAllFiles, addItem} from '../actions/index';
import {Link} from "react-router";
import DropZone from '../containers/dropzone'
import ReactTooltip from 'react-tooltip';

class DocumentList extends Component {
    constructor(props)
    {
        super(props);
        console.log("here", this.props.location);
        if (this.props.appInitSuccess) {
            this.props.fetchAllFiles({path: this.props.location});
        }
        this.state = {
            docs: this.props.docs,
            isAsc: true,
            nameIcon: "sort",
            location: this.props.location,
            showModal: false,
            document: {},
            selectedPage: 1,
            condition: false
        };

    }

    componentWillReceiveProps(newProp)
    {

        if (newProp.fileAddSuccess || newProp.percentComplete == 100 || newProp.appInitSuccess) {
            this.props.fetchAllFiles({path: this.state.location});
        }
        if (newProp.location !== this.props.location) {
            this.setState({location: newProp.location});
            this.props.fetchAllFiles({path: newProp.location, skip: 1});
            this.setState({selectedPage: 1})

        }
    }
    handleScroll(scroll) {
        this.setState({scroll: scroll});
        //console.log(window.innerHeight, scroll);
        let {scrollTop, scrollHeight} = scroll.target.body;
        if (scrollTop > (scrollHeight - window.innerHeight) * 0.75) {
            console.log('now');
            if (this.state.selectedPage < this.props.total) {
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

    close() {
        this.setState({showModal: false});
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
    render() {
        const {location} = this.state;

        if (this.props.docs.length == 0) {
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
                        <th class="dataStyle">Name</th>
                        <th class="dataStyle">Modified</th>
                        <th class="dataStyle">Actions</th>
                    </tr>

                    {this.props.docs.map((doc, i) => {
                        const titleArr = doc.title.split('/');
                        const title = titleArr[titleArr.length - 1];
                        return (
                            <tr key={i} ref="listRow" className="listStyle">
                                <td className="dataStyle">
                                    <img src={doc.img} width="30"/> {doc.type == 'file'
                                        ? (
                                            <a key={doc.id} href={doc.url} target="_blank">{title}</a>
                                        )
                                        : (
                                            <Link to={(this.state.location == '/'
                                                ? '/home'
                                                : this.state.location) + '/' + doc.title}>
                                                {title}</Link>
                                        )
}
                                </td>

                                <td class="dataStyle">
                                    {doc.modified}
                                </td>
                                <td class="dataStyle ">
                                    <span data-tip data-for="delete-icon" onMouseOver={this.toggleClass.bind(this)} onMouseOut={this.toggleClass.bind(this)} onClick={this.deleteFile.bind(this, doc.id)} class="ion ion-ios-trash-outline action-icons trash-icon"></span>
                                    <ReactTooltip id='delete-icon' type='error' place="bottom" effect='solid'>
                                        <span>{"Delete " + doc.type}</span>
                                    </ReactTooltip>

                                    {doc.type == 'file'
                                        ? <a href={doc.url} target="_blank">
                                                <span data-tip data-for="download-icon" onMouseOver={this.toggleClass.bind(this)} onMouseOut={this.toggleClass.bind(this)} class="ion ion-ios-download-outline action-icons download-icon"></span>
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
        fetchAllFiles: fetchAllFiles
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentList);
