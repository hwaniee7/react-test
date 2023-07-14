import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;
const FILES_ENDPOINT = process.env.REACT_APP_API_FILES_ENDPOINT;
const url = `${API_URL}${API_PORT}${FILES_ENDPOINT}`

interface File {
    fid:number,
    ofname:string,
    fileSize:number,
    fileType:string,
    rdate:Date,
    udate:Date,
}

const FileList:React.FC = () => {
    const [ fileList, setFileList ] = useState<File[]>([]);
    const [ pageNum, setPageNum ] = useState<number>(1);
    const [ pageSize, setPageSize ] = useState<number>(0)
    const [ totalCount, setTotalCount ] = useState<number>(0);
    const [ totalPageCount, setTotalPageCount ] = useState<number>(0);
    const history = useNavigate();

    useEffect(()=>{
        const getFileList = () =>{
            axios.get(`${url}/fileList.do`)
            .then(response => {
                console.log(response.data)
                if(response.data){
                    setFileList(response.data.list.content)
                    setPageNum(response.data.pageNum+1);
                    setPageSize(response.data.pageSize);
                    setTotalCount(response.data.totalCount);
                }
            })
            .catch((error)=>{
                //SweetAlert("Error", error, "error", true);
                console.log(error);
            })

        }
        getFileList();
       

    }, [pageNum, pageSize])

    const SweetAlert = (title:string, content:string, icon:any, showCloseButtonFlag:boolean )=>{
        Swal.fire(
            {
                title: title,
                text: content,
                icon: icon,                         
                showCloseButton: showCloseButtonFlag                
            }
        )
    }


    const paginationItems = [];    
    for (let i:number = 1; i <= totalPageCount; i++) {       
        if(i === pageNum) {
            console.log("true");
        } else {
            console.log("false");
        }
        paginationItems.push(
            <PaginationItem key={i} active={i === pageNum}>
                <PaginationLink onClick={() => chgPage(i, pageSize)}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }
    
    const chgPage = (pageNum:number, pageSize:number) => {      
        history(`/files/list?pageNum=${pageNum}&pageSize=${pageSize}`);
    };

    return (
        <>            
            <h4>
                FileList
            </h4>
            <Table>
                <thead>
                     <tr>
                        <th>번호</th>
                        <th>파일명</th>
                        <th>크기</th>
                        <th>타입</th>
                        <th>업로드 시간</th>
                        <th>수정 시간</th>
                    </tr>

                </thead>
                <tbody>                   
                    {fileList && fileList.map((item)=>(
                        <tr key={item.fid}>
                            <td>{item.fid}</td>
                            <td>{item.ofname}</td>
                            <td>{item.fileSize} Bytes</td>
                            <td>{item.fileType}</td>
                            <td>{dayjs(item.rdate).format('YY.MM.DD hh:MM:ss')}</td>
                            <td>{dayjs(item.udate).format('YY.MM.DD hh:MM:ss')}</td>
                        </tr>
                    ))}

                </tbody>
                <tfoot>
                       

                </tfoot>
            </Table>
            <Pagination size="sm" aria-label='Page navigation example'>
                <PaginationItem disabled={pageNum === 1}>
                    <PaginationLink previous onClick={() => chgPage(pageNum - 1, pageSize)} />
                </PaginationItem>
                    {paginationItems}
                <PaginationItem disabled={pageNum === totalPageCount}>
                    <PaginationLink next onClick={() => chgPage(pageNum + 1, pageSize)} />
                </PaginationItem>
            </Pagination> 
        </>
    )
}

export default FileList;