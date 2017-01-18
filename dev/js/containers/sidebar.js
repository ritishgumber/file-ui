import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {fetchAllFiles} from '../actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from "react-router";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location.pathname
        };
    }

    renderSpecificFileType(regex) {
        this.props.fetchAllFiles({path: this.state.location, regex: regex})
    }
    render() {
        const {listen} = browserHistory;
        listen(location => {
            console.log(location);

            this.setState({location: location.hash.substring(1)});

        });

        return (
            <div class="affix">
                <div id="logo">
                    <a href="#"><img src="./assets/cblogo.png" width="50"/></a>

                </div>
                <br/>
                <div id="side-menu">
                    <ul >

                        <li>
                            <Glyphicon glyph="file"/>
                            <a onClick={this.renderSpecificFileType.bind(this, '(.*)')}>
                                &nbsp;&nbsp;All Files</a>
                        </li>
                        <li>
                            <Glyphicon glyph="picture"/>
                            <a onClick={this.renderSpecificFileType.bind(this, '(.*)image(.*)')}>
                                &nbsp;&nbsp;Photos</a>
                        </li>
                        <li>
                            <Glyphicon glyph="folder-open"/>
                            <a onClick={this.renderSpecificFileType.bind(this, '(.*)folder(.*)')}>
                                &nbsp;&nbsp;Folders</a>
                        </li>

                    </ul>
                </div>
            </div>

        );
    }

}
function mapStateToProps(state) {
    return {document: state.activeDoc};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchAllFiles: fetchAllFiles
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SideBar);
