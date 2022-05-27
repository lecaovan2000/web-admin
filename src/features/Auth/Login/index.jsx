import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import LoginForm from '../LoginForm'
import ImgCover from '../../../assets/img/coveimg.jpg'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { path } from '../../../constants/path'
import { unwrapResult } from '@reduxjs/toolkit'
import { login } from '../../../app/authSlice'
import { useSnackbar } from 'notistack'
import { utilsToken } from '../../../utils/token'
import apiLoginAdmin from '../../../api/apiLoginAdmin'
import { common } from '../../../utils/common'

function Login() {
   const history = useHistory()
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   useEffect(()=>{
      const checkAccessToken = async()=>{
         const token = utilsToken.getAccessToken()
         if(token){
            try {
                  history.push(path.root)
            } catch (error) {
               common.removeBearerToken()
            }
         }
      }
      checkAccessToken()
   },[history])

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