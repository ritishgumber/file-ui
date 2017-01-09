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
    }

    render() {

        return (
            <div className="bodyStyle">
                <NavBar location={this.props.location}/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2 col-xs-2 col-md-2">
                            <SideBar/>
                        </div>
                        <div className="col-sm-10 col-xs-10 col-md-10">
                            {this.props.children}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
