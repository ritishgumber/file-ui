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
        $(".side-menu-items").click(function() {
            $(this).addClass("side-item-selected");
            $(this).siblings().removeClass("side-item-selected");
        });
        if (!this.props.fetching)
            this.props.fetchAllFiles({path: this.state.location, regex: regex})
    }
    render() {
        const {listen} = browserHistory;
        listen(location => {
            $(".side-menu-items:first-child").addClass("side-item-selected");
            $(".side-menu-items:first-child").siblings().removeClass("side-item-selected");
            this.setState({
                location: decodeURIComponent(location.pathname)
            });

        });

        return (
            <div class="affix">
                <div id="logo"></div>
                <br/>
                <div id="side-menu">
                    <ul >

                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)')}>
                            <i class=" ion-document-text side-bar-icon"></i>
                            &nbsp;&nbsp;All Files
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)image(.*)')}>
                            <i class="ion ion-images side-bar-icon"></i>
                            &nbsp;&nbsp;Photos
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)folder(.*)')}>
                            <i class="ion ion-folder side-bar-icon"></i>
                            &nbsp;&nbsp;Folders
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)audio(.*)')}>
                            <i class="ion ion-music-note side-bar-icon"></i>
                            &nbsp;&nbsp;Music
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)video(.*)')}>
                            <i class="ion ion-ios-videocam side-bar-icon"></i>
                            &nbsp;&nbsp;Video
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '((.*)openxmlformat(.*)|(.*)msword(.*)|(.*)vnd.ms-(.*)|(.*)pdf(.*))')}>
                            <i class="ion ion-android-document side-bar-icon"></i>
                            &nbsp;&nbsp;Documents
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
