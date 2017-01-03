import React from 'react';
import NavBar from '../containers/nav';
import SideBar from '../containers/sidebar';
import MainBody from '../containers/mainbody';

import {Row,Grid,Col} from 'react-bootstrap';

require('../../scss/style.scss');
const d={
  position:"fixed"
};
const App = () => (
    <div className="bodyStyle" >
<NavBar />
	   <div className="container">
      <div className="row">
         <div  className="col-sm-2 col-xs-2 col-md-2">
         <SideBar  />

         </div>
         <div className="col-sm-10 col-xs-10 col-md-10">
          			   <MainBody />
         </div>

       </div>
     </div>
    </div>
);

export default App;
