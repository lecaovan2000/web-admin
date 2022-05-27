import './App.css';
import React,  {Suspense} from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { path } from './constants/path';
import { utilsToken } from './utils/token';
// import Login from './features/Auth/Login'
// import LayoutRoute from './features/LayoutRoute'
import { Spin } from 'antd';
const Login = React.lazy(()=>import('./features/Auth/Login'));
const LayoutRoute = React.lazy(()=> import('./features/LayoutRoute'))
function App() {
  const Token = utilsToken.getAccessToken()
  return (
    <>
    <Suspense
      fallback={
        <Spin size="large"/>
      }
    >
      <Switch>
        <Route exact path={path.login} component={Login} />
        <Route path={path.root} component={LayoutRoute} />
      </Switch>
      {/* {Token?<LayoutRoute/>:<Login/>} */}
    </Suspense>
      
      {/* <Switch>
        <Route exact path={path.login} component={Login} />
        <Route path={path.root} component={LayoutRoute} />
      </Switch> */}
    </>
  );
}

export default App;
