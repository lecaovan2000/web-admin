import React from "react";
import './style.scss'
import {UserOutlined} from'@ant-design/icons'
import { NavLink } from "react-router-dom";

function CardOverview(props){
   const {numberAll,numberActive, icon, loading,text,path}= props
   return(
      <div>
         {!loading&&(
            <div className="card">
            <div className="card-content">
               <div>
                  {icon}
                  {/* <UserOutlined style={{ fontSize:50, color:'white' }}/> */}
                  <div>
                  <NavLink className='card-content-link'  to={path}>{numberAll.total} {text}</NavLink>
                  </div>
               </div>

               <div className="content-user">
                  <div>
                     <NavLink className='content-user__status-active'  to={path}>{numberActive.total} {text} active</NavLink>
                  </div>

                  <div>
                      <NavLink className='content-user__status-unacti'  to={path}>{(numberAll.total)-(numberActive.total)} {text} lock</NavLink>
                  </div>
               </div>
               
            </div>
         </div>
         )}
         
      </div>
   )
}
export default CardOverview