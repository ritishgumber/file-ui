import React, {Component} from 'react';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteFile, fetchAllFiles} from '../actions/index';
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
            this.props.fetchAllFiles({path: newProp.location, skip: this.state.selectedPage});;

        }
    }
    componentWillMount() {}

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
    fetchPage(pageNo) {
        this.state.selectedPage = pageNo;
        this.setState(this.state);
        this.props.fetchAllFiles({path: this.state.location, skip: pageNo});
    }
    changePage(type)
    {
        let {selectedPageSet, selectedPage} = this.state;
        let {total} = this.props;
        if (type == 'next') {
            if (selectedPageSet < Math.floor(total / 5)) {
                selectedPageSet++;
            } else {
                selectedPageSet = Math.floor(total / 5);
            }
        } else {
            if (selectedPageSet > 0) {
                selectedPageSet--;
            } else {
                selectedPageSet = 0;
            }

        }
        console.log("page", selectedPage);
        selectedPage = selectedPageSet * 5 + 1;
        this.setState({selectedPageSet: selectedPageSet, selectedPage: selectedPage});
        this.props.fetchAllFiles({path: this.state.location, skip: selectedPage});

    }
    renderPagination() {
        let {total} = this.props;
        const {selectedPage, selectedPageSet} = this.state;
        let list = [];
        if (selectedPageSet > 0)
            list.push(
                <li onClick={this.changePage.bind(this, 'prev')} key={0}>
                    <a>
                        <img width="20px" src="./assets/backicon.png"/>
                    </a>
                </li>
            );

        for (let i = 1 + selectedPageSet * 5; i <= 5 + selectedPageSet * 5; i++) {
            if (i > total)
                break;

            list.push(
                <li key={i} onClick={this.fetchPage.bind(this, i)} class={i == selectedPage
                    ? 'active'
                    : ''}>

                    <a >
                        {i}
                    </a>
                </li>
            );
        }

        if (selectedPageSet < Math.floor((total - 1) / 5))
            list.push(
                <li onClick={this.changePage.bind(this, 'next')} key={100}>
                    <a>
                        <img width="20px" src="./assets/righticon.png"/>
                    </a>
                </li>
            );

        return list;
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
                                        <Glyphicon glyph="download-alt"/>
                                    </td>
                                </tr>
                            )
                        })}</tbody>
                </table>
                {this.props.fetching
                    ? <img src="./assets/smallrectLoader.gif" class="" width="50px"/>
                    : <ul class="pagination">{this.renderPagination()}</ul>}
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
        fetchAllFiles: fetchAllFiles
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DocumentList);
