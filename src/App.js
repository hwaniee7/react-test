//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Account from './Component/Account/Account';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Hello React!(환경변수: {process.env.REACT_APP_ENV_NAME})</h1>
        <Account/>
      </div>
    </div>
  );
}

export default App;
