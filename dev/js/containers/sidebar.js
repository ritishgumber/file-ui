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
                <div id="logo"></div>
                <br/>
                <div id="side-menu">
                    <ul >

                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)')}>
                            <img src="./assets/allfiles.png" width="20px"/>
                            &nbsp;&nbsp;All Files
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)image(.*)')}>
                            <img src="./assets/allphotos.png" width="20px"/>
                            &nbsp;&nbsp;Photos
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)folder(.*)')}>
                            <img src="./assets/allfolders.png" width="20px"/>
                            &nbsp;&nbsp;Folders
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)audio(.*)')}>
                            <img src="./assets/music.png" width="20px"/>
                            &nbsp;&nbsp;Music
                        </li>
                        <li class="side-menu-items" onClick={this.renderSpecificFileType.bind(this, '(.*)video(.*)')}>
                            <img src="./assets/video.png" width="20px"/>
                            &nbsp;&nbsp;Video
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
