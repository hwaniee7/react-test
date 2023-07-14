import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputGroup, InputGroupText, Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;
const FILES_ENDPOINT = process.env.REACT_APP_API_FILES_ENDPOINT;
const url = `${API_URL}${API_PORT}${FILES_ENDPOINT}`

const FileInsert:React.FC = () => {    
    const [ file, setFile ] = useState(null);
    const fileRef = useRef<HTMLInputElement>(null);    
    const navigate = useNavigate();

    useEffect(()=>{
        if(file) {
            console.log(file)
        }
    }, [file])

    const handleSelectedFile = (event:any) => {
        const file = event.target.files[0];        
        if(file) {
            setFile(file);            
        }
    }

    const onSubmit = (e:any) => {
        e.preventDefault();
        if (!file) {
            SweetAlert("", "선택된 파일이 없습니다.", 'error',  true);
            return;
        };

        const formData = new FormData();
        formData.append('file', file);        
     
        axios.post(`${url}/fileUpload.do`, formData)
        .then(response => {            
            console.log('응답 데이터:', response.data); 
            setFile(null);
            if(fileRef.current){
                fileRef.current.value = '';
            }            
            navigate("/files");
        })
        .catch(error => {        
            console.error('에러:', error);        
        });
        

    }

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

    return (
        <>    
            <InputGroup>                
                <Input type="file" innerRef={fileRef} onChange={handleSelectedFile}/>
                <Button type="button" onClick={onSubmit}>Upload</Button>
            </InputGroup>
            <br/>
            <Nav>
                <NavItem>
                    <NavLink href="/files">뒤로 가기</NavLink>
                </NavItem>
            </Nav>
        </>
    )

}
export default FileInsert;