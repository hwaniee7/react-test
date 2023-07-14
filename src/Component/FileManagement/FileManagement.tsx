import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";

import FileList
 from "./FileList";
const FileManagement:React.FC = () => {
    return (
        <>
            <h1> FileManagement </h1>
            <Nav>
                <NavItem>
                    <NavLink href="/" > 메인으로.. </NavLink>                                          
                </NavItem>
                <NavItem>
                    <NavLink href="/files/insert"> 업로드 </NavLink>   
                </NavItem>
            </Nav>
            <br/>
            <FileList/>
            
        </>        
    )
}
export default FileManagement;
