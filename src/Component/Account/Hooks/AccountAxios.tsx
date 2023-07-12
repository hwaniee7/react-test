import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
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

const AccountAxios:React.FC = () => {

    const [ account, setAccount ] = useState<Account[]>([]);

    useEffect(()=>{
        const fetchAccount = async () => {
            console.log("This is AccountAxios");            
            const response = await axios.get(`${API_URL}${API_PORT}${ENDPOINT}`);
            const account = await response.data
            console.log(account);
            setAccount(account);
        };
        fetchAccount();
    },[])

    return (
        <>  
            <h1>This is called by axios</h1>         
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
                    {account && account.map((item)=>(
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

export default AccountAxios;