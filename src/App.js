//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css'

//Components
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer'

import Main from './Component/Main/Main'
import Account from './Component/Account/Account';
import FileManagement from './Component/FileManagement/FileManagement';
import FileInsert from "./Component/FileManagement/FileInsert";
import FileList from "./Component/FileManagement/FileList";


//route
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <Header/>

        <div className='body-container'>
          <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/files" element={<FileManagement/>} />
            <Route path="/files/insert" element={<FileInsert/>} />
            <Route path="/files/list" element={<FileList/>} />
          </Routes>
        </div>
        <Footer/>
       
      </div>
    </div>
  );
}

export default App;
