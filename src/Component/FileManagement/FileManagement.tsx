import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";

import FileList
 from "./FileList";
const FileManagement:React.FC = () => {
    return (
        <>
            <h1> FileManagement </h1>
           
            <br/>
            <FileList/>
            
        </>        
    )
}
export default FileManagement;
