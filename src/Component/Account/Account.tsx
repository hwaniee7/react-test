import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Table } from "reactstrap"
import dayjs from "dayjs";

//Hooks
import AccountFetch from "./Hooks/AccountFetch";
import AccountAxios from "./Hooks/AccountAxios";



const Account = () =>  {
    const [ account, setAccount ] = useState(<AccountFetch/>);
    const [ selectedButton, setSelectedButton ] = useState<string>("fetchButton");
    const handleBtnClick = (param:string):void =>  {
        if (param === "fetchButton") {
            setAccount(<AccountFetch/>)
            setSelectedButton(param);
        } else if (param === "axiosButton") {
            setAccount(<AccountAxios/>)    
            setSelectedButton(param);
        }
    }
    return (
        <>
            <ButtonGroup>
                <Button color={selectedButton ==="fetchButton" ? "primary" : "transparent"} onClick={() => handleBtnClick("fetchButton")}>Fetch</Button>
                <Button color={selectedButton ==="axiosButton" ? "primary" : "transparent"} onClick={() => handleBtnClick("axiosButton")}>Axios</Button>
            </ButtonGroup>
            {account || <h3>"버튼을 클릭하세요."</h3>}
        </>
    );
}

export default React.memo(Account);
