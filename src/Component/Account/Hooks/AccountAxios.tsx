import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Axios, { AxiosResponse} from "axios";
import dayjs from "dayjs";

const API_URL:string | undefined = process.env.REACT_APP_API_URL;
const API_PORT:string | undefined = process.env.REACT_APP_API_PORT;
const ENDPOINT: string | undefined = process.env.REACT_APP_API_ENDPOINT;

const baseURL: string = (API_URL || '') + (API_PORT || '');
interface Account {
    userid: number,
    username: string,
    email: string,
    rdate: Date | undefined,
    lastLogin: Date | undefined,
}

const AccountAxios:React.FC = () => {
    const [ account, setAccount ] = useState<Account[]>([]);
    useEffect(() =>{
        //console.log("This is AccountAxios");   
        const axiosAccount = ():void =>{
            Axios.get<Account[]>(`${baseURL}${ENDPOINT || ''}`)
            .then((response: AxiosResponse<Account[]>) => {
                //console.log(response)
                setAccount(response.data);  
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        axiosAccount();             
    },[]);
    return (
        <>  
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
                                {item.rdate && dayjs(item.rdate).format('YY.MM.DD hh:MM:ss')}
                            </td>
                            <td>
                                {item.lastLogin && dayjs(item.lastLogin).format('YY.MM.DD hh:MM:ss')}
                            </td>
                        </tr>
                    ))}                
                </tbody>
                <tfoot>                    
                </tfoot>

            </Table>
        </>
    );
}
export default AccountAxios;