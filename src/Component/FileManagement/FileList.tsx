import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink,
    ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal, { SweetAlertIcon, SweetAlertPosition, SweetAlertResult } from "sweetalert2";
import dayjs from "dayjs";

const API_URL:string | undefined = process.env.REACT_APP_API_URL;
const API_PORT:string | undefined = process.env.REACT_APP_API_PORT;
const FILES_ENDPOINT:string | undefined = process.env.REACT_APP_API_FILES_ENDPOINT;
const url:string = (API_URL || '') + (API_PORT || '') + (FILES_ENDPOINT || '');

interface FileInfo {
    fid:number,
    ofname:string,
    fileSize:number,
    fileType:string,
    rdate:Date | undefined,
    udate:Date | undefined,
}

const FileList:React.FC = () => {
    const [ fileList, setFileList ] = useState<FileInfo[]>([]);
    const [ pageNum, setPageNum ] = useState<number>(1);
    const [ pageSize, setPageSize ] = useState<number>(0)
    const [ totalCount, setTotalCount ] = useState<number>(0);
    const [ totalPageCount, setTotalPageCount ] = useState<number>(0);

    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [allChecked, setAllChecked] = useState(false);
    const history = useNavigate();

    useEffect(()=>{
        const getFileList = () =>{
            axios.get(`${url}/fileList.do`)
            .then(response => {
                //console.log(response.data)
                if(response.data){
                    setFileList(response.data.list.content as FileInfo[])
                    setPageNum(response.data.pageNum as number + 1);
                    setPageSize(response.data.pageSize as number);
                    setTotalCount(response.data.totalCount as number);
                }
            })
            .catch((error)=>{
                //SweetAlert("Error", error, "error", true);
                console.log(error);
            })

        }
        getFileList();

    
    }, [pageNum, pageSize])


    // 전체 선택, 해제 핸들러
    const handleCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;    
        if (event.target.checked) {
            // 이전 상태값(checkedItems)에 추가적으로 value라는 요소를 추가
            setCheckedItems([...checkedItems, value]);    
        } else {
            // checkedItems 배열에서 value와 같지 않은 요소만 남기고, 그 요소들로 새로운 배열을 생성하여 상태를 변경
            setCheckedItems(checkedItems.filter((item) => item !== value));          
        }

    };


    // 리스트 각 행 체크여부 핸들러
    const handleAllCheckChnage = (event:React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;     
        setAllChecked(checked);   
        if (checked) {
            //모두 체크
            const checkboxes = document.getElementsByName('fileChk');
            const checkedIds = [];
            for (let i = 0; i < checkboxes.length; i++) {
                const checkbox = checkboxes[i] as HTMLInputElement;
                checkbox.checked = true;
                checkedIds.push(checkbox.value);
            }
            setCheckedItems(checkedIds);
        } else {
            // 모두 해제
            const checkboxes = document.getElementsByName('fileChk');
            for (let i = 0; i < checkboxes.length; i++) {
                const checkbox = checkboxes[i] as HTMLInputElement;
                checkbox.checked = false;
            }
            setCheckedItems([]);
        }        

    }

    const sweetAlertConfirm = (position:SweetAlertPosition, icon:SweetAlertIcon, title:string, text:string, checkedItems:string[]): Promise<SweetAlertResult<any>> => {
        const itemsText = checkedItems.join(', '); // 배열을 문자열로 변환
        return Swal.fire({
            position: position,
            icon: icon,
            title: title,
            text: text + ": " + itemsText,
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonColor: 'rgb(253, 102, 102)',
            confirmButtonText:'예',
            cancelButtonColor: 'rgb(102, 102, 255)',
            cancelButtonText:'아니오'
        })
    }

    const sweetAlertError = (title:string, content:string, icon:any, confirmButtonText:string ):void=>{
        Swal.fire(
            {
                title: title,
                text: content,
                icon: icon,                         
                confirmButtonText: confirmButtonText             
            }
        )
    }

    const handleViewDetailButton = () =>{
        if (checkedItems.length === 1) {
            const itemId = checkedItems[0];             
            history(`/files/fileDetail/${itemId}`)
            // ...
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: '1개만 체크해주세요',
                showConfirmButton: false,
                timer: 1500
              })
        }

    }
    const handleDeleteButton = () =>{
        if (checkedItems.length === 1) {            
            // 하나의 체크박스만 선택된 경우
            sweetAlertConfirm("center", "warning", "선택한 파일을 삭제하시겠습니까?", "파일번호", checkedItems)
            .then((result)=>{
                if(result.value){
                   console.log(result.value)                 
                }
            })
            .catch(error =>{
                sweetAlertError('삭제 중 에러발생', 'error', 'error', '닫기');                
            }) 

        } else if (checkedItems.length ===0){
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: '삭제할 파일을 선택하세요.',
                showConfirmButton: false,
                timer: 1500
              })

        } else {
            sweetAlertConfirm("center", "warning", "모두 삭제하시겠습니까?", "파일번호", checkedItems)
            .then((result)=>{
                if(result.value){
                    console.log(result.value)    
                }
            })
            .catch(error =>{
                sweetAlertError('삭제 중 에러발생', 'error', 'error', '닫기');                
            })  

        }
    }

  


    const paginationItems: any[] = [];    
    for (let i = 1; i <= totalPageCount; i++) {       
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
    
    const chgPage = (pageNum:number, pageSize:number):void => {      
        history(`/files/list?pageNum=${pageNum}&pageSize=${pageSize}`);
    };

    return (
        <>            
            <h4>
                FileList
            </h4>
            <ListGroup>            
                    <ListGroupItem>                                         
                        <Button color='info' onClick={e => history('/files/insert')}>파일 등록</Button>
                        &nbsp;&nbsp;
                        <Button color='warning' onClick={handleViewDetailButton}>파일 상세보기</Button>
                        &nbsp;&nbsp;
                        <Button color='danger' onClick={handleDeleteButton}>파일 삭제</Button>
                    </ListGroupItem>
                </ListGroup>          
            <Table>
                <thead>
                     <tr>
                        <th>
                            <input type='checkbox' onChange={handleAllCheckChnage} />
                        </th>
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
                             <td>
                                            <input 
                                                type='checkbox'
                                                value={item.fid}
                                                name='fileChk'                                                                                                
                                                onChange={handleCheckboxChange}
                                            />
                                        </td>
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