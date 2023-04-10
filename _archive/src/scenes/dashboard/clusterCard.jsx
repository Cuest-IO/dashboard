import * as React from 'react';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";



const ClusterCard = (props) =>{
    return (
<div className="card"  style={props.style}>
  <div className="cardHeader">
    <div className='title'> 
        Cluster
    </div>
  </div>
    <div className="actions">
       <Button component={Link} to="/nodes"><span className="buttonTitle">View Nodes</span></Button>
       <Button >Test Button</Button>

       
    </div>
    <div className='charts'>
      ddd
    </div>
</div>
    ) ;
}    

export default ClusterCard;