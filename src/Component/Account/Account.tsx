import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Table, NavItem, NavLink, Nav } from "reactstrap"
import dayjs from "dayjs";

//Hooks
//import AccountFetch from "./Hooks/AccountFetch";
import AccountAxios from "./Hooks/AccountAxios";



const Account = () =>  {
    const [ account, setAccount ] = useState(<AccountAxios/>);
    
    /* const [ selectedButton, setSelectedButton ] = useState<string>("fetchButton");
    const handleBtnClick = (param:string):void =>  {
        if (param === "fetchButton") {
            setAccount(<AccountFetch/>)
            setSelectedButton(param);
        } else if (param === "axiosButton") {
            setAccount(<AccountAxios/>)    
            setSelectedButton(param);
        }
    } */
    
    return (
        <>
            {/* <ButtonGroup>
                <Button color={selectedButton ==="fetchButton" ? "primary" : "transparent"} onClick={() => handleBtnClick("fetchButton")}>Fetch</Button>
                <Button color={selectedButton ==="axiosButton" ? "primary" : "transparent"} onClick={() => handleBtnClick("axiosButton")}>Axios</Button>
            </ButtonGroup> */}
            <Nav>
                <NavItem>
                        <NavLink href="/" > 메인으로.. </NavLink>
                </NavItem>
            </Nav>
           
            {account}
        </>
    );
}

export default React.memo(Account);
