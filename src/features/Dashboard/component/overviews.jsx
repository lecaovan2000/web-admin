import React, { useState, useEffect } from "react";
import CardOverview from "../../../components/CardOvervew";
import apiUser from "../../../api/apiUser";
import {UserOutlined,FileDoneOutlined} from'@ant-design/icons'
import apiNews from '../../../api/apiNews'
import { path } from "../../../constants/path";
function OverView(){
   const [dataSource,setDataSource]=useState({})
   const [userActive,setUserActive]=useState({})
   const [allNews,setAllNews]=useState({})
   const [newsActi,setNewsActi]=useState({})
   const [loading, setLoading]=useState(false)

   useEffect(()=>{
      const getUser = async()=>{
         setLoading(true)
      try {
         const payload={
            role:'CUSTOMER',
         }
         const response = await apiUser.getAllUser(payload)
         // console.log('data',response)
         setDataSource(response)
      } catch (error) {
         console.log('error', error)   
      }
      setLoading(false)
   }
   getUser()
},[])

useEffect(()=>{
   const getUserActive = async()=>{
      setLoading(true)
      try {
         const payload={
            role:'CUSTOMER',
            activate:'true'
         }
         const respon = await apiUser.getAllUser(payload)
         setUserActive(respon)
      } catch (error) {
         console.log('error', error)   
      }
      setLoading(false)
   }
   getUserActive()
},[])

useEffect(()=>{
   const getNews = async()=>{
      setLoading(true)
      try {
         const res = await apiNews.getAllNews()
         setAllNews(res)
      } catch (error) {
         console.log('error', error)   
      }
      setLoading(false)
   }
   getNews()
},[])
useEffect(()=>{
   const getNewsActi = async()=>{
      setLoading(true)
      try {
         const res = await apiNews.getAllNews({status:'true'})
         setNewsActi(res)
      } catch (error) {
         console.log('error', error)   
      }
      setLoading(false)
   }
   getNewsActi()
},[])
   return(
      <div className="page_overview">
         <div className="page_overview-content">
            <h1>Overview</h1>
            <div className="page_overview-content_item">
               <div style={{paddingRight:'50px'}}>
                  <CardOverview
                     icon={<UserOutlined style={{ fontSize:50, color:'white' }} />}
                     numberAll={dataSource}
                     numberActive={userActive}
                     loading={loading}
                     text='user'
                     path={path.user}
                  />
               </div>
                  
               <div>
                  <CardOverview
                     icon={ <FileDoneOutlined style={{ fontSize:50, color:'white' }} /> }
                     numberAll={allNews}
                     numberActive={newsActi}
                     loading={loading}
                     text='news'
                     path={path.project}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}export default OverView