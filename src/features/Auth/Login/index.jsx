import React from 'react'
import { Row, Col } from 'antd'
import LoginForm from '../LoginForm'
import ImgCover from '../../../assets/img/coveimg.jpg'
function Login() {
   return (
         <Row className="login-container">
            <Col span={6} className="left-container">
               <div  className="login-wrapper">
                  <div className='name_logo'>
                     <h3>Login Admin</h3>
                  </div>
                  <div className="login__form">
                     <LoginForm/>
                  </div>
               </div>
            </Col>
            <Col span={16} className="right-container">
               <img  className="right-container-img" alt="cover of login page" src={ImgCover} />
            </Col>
      </Row>
      
   )
}

export default Login