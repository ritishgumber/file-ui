import React, {Component} from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem,Nav,Grid,Row,Col  } from 'react-bootstrap';

export default class NavBar extends Component {
    render() {
      const inline={display:"inline-block",padding:"5px"}
      const inlineRight={display:"inline-block",marginLeft:"30%"}

        return (
          <div className="container header">
          <Nav pullRight >
        <a href="#">Upgrade</a>
        <a href="#"> <img src="./assets/user-default-image.jpg" width='25'/> My Profile</a>
        </Nav>
        <div className="container "><Grid>
   		<Row>
        <Col md={2}>
        <div id="logo" ><img src="./assets/cblogo.png" width="50"/>
        </div>
        </Col>
   			<Col md={10}>
   			   <h3 style={inline}>CloudBoost File UI </h3>
           <div style={inlineRight}>
           <img style={inline} src="./assets/fileadd.png" width="30px"/>
           <img  style={inline} src="./assets/folderadd.png" width="30px"/>
           <img  style={inline} src="./assets/delete.png" width="40px"/>

           <input type="text" style={inline} placeholder="Search" />
          </div>
         </Col>
   		</Row>

   	   </Grid></div>
        </div> );
    }

}
