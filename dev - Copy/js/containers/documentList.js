import React, {Component} from 'react';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteFile, fetchAllFiles, addItem} from '../actions/index';
import {Link} from "react-router";
import DropZone from '../containers/dropzone'

class DocumentList extends Component {
    constructor(props)
    {
        super(props);
        console.log("here", this.props.location);
        this.props.fetchAllFiles({path: this.props.location});
        this.state = {
            docs: this.props.docs,
            isAsc: true,
            nameIcon: "sort",
            location: this.props.location,
            showModal: false,
            document: {},
            selectedPage: 1,
            selectedPageSet: 0
        };

    }

    componentWillReceiveProps(newProp)
    {
        console.log("here2", newProp.location);
        if (newProp.location !== this.state.location) {
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

    sortByKey(array, key, isAsc) {
        array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            if (isAsc)
                return ((x < y)
                    ? -1
                    : ((x > y)
                        ? 1
                        : 0));
            else
                return ((x < y)
                    ? 1
                    : ((x > y)
                        ? -1
                        : 0));
            }
        );
    }
    sortDocuments(key) {
        var isAsc = this.state.isAsc;
        this.setState({
            isAsc: !isAsc
        });
        if (key == "title")
            this.setState({
                nameIcon: (isAsc
                    ? 'sort-by-alphabet'
                    : 'sort-by-alphabet-alt'),
                modifiedIcon: "",
                docs: this.sortByKey(this.props.docs, key, isAsc)
            })
        else
            this.setState({
                modifiedIcon: (isAsc
                    ? 'sort-by-order'
                    : 'sort-by-order-alt'),
                nameIcon: "",
                docs: this.sortByKey(this.props.docs, key, isAsc)
            })
    }

    close() {
        this.setState({showModal: false});
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
            <div>
                <table >
                    <tbody>
                        <tr >
                            <th onClick={this.sortDocuments.bind(this, 'title')}>
                                Name
                                <Glyphicon glyph={this.state.nameIcon}/>
                            </th>
                            <th onClick={this.sortDocuments.bind(this, 'modified')}>Modified
                                <Glyphicon glyph={this.state.modifiedIcon}/></th>
                            <th>Actions</th>
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

                                    <td >
                                        <a href="#">{doc.modified}</a>
                                    </td>
                                    <td >
                                        <Glyphicon glyph="remove" onClick={this.props.deleteFile.bind(this, doc.id)}/>
                                        <Glyphicon glyph="pencil"/>
                                        <a target="_blank" key={i} href={doc.url}>
                                            <Glyphicon glyph="download-alt"/>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}</tbody>
                </table>
                {this.props.fetching
                    ? <img src="./assets/smallrectLoader.gif" class="" width="50px"/>
                    : null}
            </div>

        );
    }

}

function mapStateToProps(state) {
    console.log("inside mapStateToProps", state.documents);
    return {docs: state.documents.docs, fetching: state.documents.fetching, total: state.documents.total};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteFile: deleteFile,
        fetchAllFiles: fetchAllFiles,
        addItem: addItem
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentList);
