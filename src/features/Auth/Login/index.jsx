import React from 'react'
import { Row, Col } from 'antd'
import LoginForm from '../LoginForm'
import ImgCover from '../../../assets/img/coveimg.jpg'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { path } from '../../../constants/path'
import { unwrapResult } from '@reduxjs/toolkit'
import { login } from '../../../app/authSlice'
import { useSnackbar } from 'notistack'

function Login() {
   const history = useHistory()
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   const handleSubmit = async (values) => {
      try {
         const adminLogin = await dispatch(login(values))
         unwrapResult(adminLogin);
         history.go(0)
      } catch (error) {
         enqueueSnackbar(error.message,{
            variant: 'error'
         })
         
      }
  }
   return (
         <Row className="login-container">
            <Col span={8} className="left-container">
               <div  className="login-wrapper">
                  <div className='login__logo'>
                     <h1>Login Admin</h1>
                  </div>
                  <div className="login__form">
                     <LoginForm onSubmit={handleSubmit} />
                  </div>
               </div>
            </Col>
            
            <Col span={16} className="right-container">
               <img   alt="cover of login page" src={ImgCover} />
            </Col>
      </Row>
      
   )
}

export default Login