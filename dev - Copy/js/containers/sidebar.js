import React, {Component} from 'react';
import { Glyphicon  } from 'react-bootstrap';

export default class SideBar extends Component {


    render() {

        return (
          <div>

            <br/><div id="side-menu">
              <ul >
                <li>
                  <Glyphicon glyph="time"/><a href="#/"> Recents</a>
                </li>
                <li>
                  <Glyphicon glyph="file"/><a href="#/"> Files</a>
                </li>
                <li>
                  <Glyphicon glyph="picture"/><a href="#/"> Photos</a>
                </li>
                

              </ul></div>
          </div>


		);
    }

}
