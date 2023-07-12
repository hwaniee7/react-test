import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import dayjs from "dayjs";

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

interface Account {
    userid: number,
    username: string,
    email: string,
    rdate: Date,
    lastLogin: Date,
}

const AccountFetch:React.FC = () => {

    const [ account, setAccount ] = useState<Account[]>([]);

    useEffect(()=>{
        const fetchAccount = async () => {
            console.log("This is AccountFetch");            
            const response = await fetch(`${API_URL}${API_PORT}${ENDPOINT}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const account = await response.json();
            console.log(account);
            setAccount(account);
        };
        fetchAccount();
    },[])
    return (
        <>  
            <h1>This is called by fetch</h1>           
            <Table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>로그인</th>
                    </tr>
                </thead>
                <tbody>
                    {account && account.map((item, index)=>(
                        <tr key={item.userid}>
                            <td>
                                {item.username}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {dayjs(item.rdate).format('YY.MM.DD hh:MM:ss')}
                            </td>
                            <td>
                                {dayjs(item.lastLogin).format('YY.MM.DD hh:MM:ss')}
                            </td>

                        </tr>
                    ))}
                
                </tbody>

            </Table>
        </>
    );
}

export default AccountFetch;