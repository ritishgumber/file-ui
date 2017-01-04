import React, {Component} from 'react';
import { Glyphicon  } from 'react-bootstrap';
import { browserHistory,Link } from 'react-router';

export default class Test extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      location:this.props.location.pathname
    };
  }



    render() {
      const { listen } = browserHistory;
      listen(location => {
        console.log(location);
        this.setState({
          location:location.hash.substring(1)
        });
      });
      const {location}=this.state;
      const a=location.split("/");
      if(a[0]=="")
      a.splice(0,1);
      const breadcrumb =a.map((b)=><Link to={'/'+b}>  {b} &gt; </Link> );
      console.log(a);
        return (<div>{breadcrumb}</div>);
    }

}
