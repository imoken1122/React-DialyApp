import React from 'react';
import "./github.css"

const MDViewer = (props)=>{
    return(
     <div dangerouslySetInnerHTML={{__html: props.html}}></div>
    );
}
export default MDViewer;