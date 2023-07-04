import { useEffect, useState } from "react"
import { Table } from "reactstrap"
import dayjs from "dayjs";

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;



const Account = () => {
    const [ account, setAccount ] = useState([]);

    useEffect(()=>{
        const fetchAccount = async () => {
            console.log(API_URL);
            console.log(API_PORT);

            const response = await fetch(`${API_URL}:${API_PORT}/account`);
            const account = await response.json();
            console.log(account);
            setAccount(account);
        };
        fetchAccount();
    },[])
    return (
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
    );
}

export default Account;
