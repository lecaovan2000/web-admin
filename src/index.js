import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import store from './app/store'
import './scss/styles.scss'
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <SnackbarProvider   maxSnack={1}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
