import React from 'react';
//import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const NodeCard = (props) =>{
    return (
<div className="card"  style={props.style}>
    <div className='title'> 
      Nodes
    </div>
    <div className="actions">
      <Link to="/nodes">
      
        <button type="button" className="button lead">View Nodes</button> 
      </Link>
      
      <Link to="/nodes">
      
        <button type="button" className="button regular">Report a problem > </button> 
      </Link>
       


    </div>
    <div className='charts'>
      ddddd
    </div>
</div>
    ) ;
}    

export default NodeCard;