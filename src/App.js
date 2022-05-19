import './App.css';
import React,  {Suspense} from 'react';
import Login from './features/Auth/Login';
import LayoutRoute from './features/LayoutRoute';

function App() {
  return (
    <div>
      <LayoutRoute/>
    </div>
  );
}

export default App;
