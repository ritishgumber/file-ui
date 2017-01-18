import React from 'react';
import NavBar from '../containers/nav';
import SideBar from '../containers/sidebar';
import MainBody from '../containers/mainbody';

import {Row, Grid, Col} from 'react-bootstrap';

const d = {
    position: "fixed"
};
export default class App extends React.Component {
    constructor(props)
    {
        super(props);
        //console.log(this.props.location);
        CB.CloudApp.init('http://localhost:4730', 'wfjdlqitrnig', '19e6ae3a-3a8b-42ed-8562-57731d2cefa5');
        this.state = {
            scroll: {}
        };
    }

    render() {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-2 col-xs-2 col-md-2">
                        <SideBar location={this.props.location}/>
                    </div>
                    <div className="col-sm-10 col-xs-10 col-md-10">
                        {this.props.children}
                    </div>

                </div>
            </div>
        );
    }
}
