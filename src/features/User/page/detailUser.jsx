import React, { useState,useEffect } from "react";
import { useRouteMatch } from 'react-router-dom'
import Header from "../../../components/Header";
import TableProjectUser from "../../../components/tableProjectForUser";
import apiUser from "../../../api/apiUser";
import { useSnackbar } from "notistack";
import IconBack from "../../../assets/icons/IconBack";
import { useHistory } from "react-router-dom";
// import { utilsToken } from "../../../utils/token";

function DetailUser(){
   const {
      params: { userUid }
   } = useRouteMatch()
   const history = useHistory()
   const [pagination, setPagination] = useState({
      pageSize: 10,
      pageNo: 1
   })

   const [dataSource, setDataSource] =useState({})
   const [profileUser, setProfileUser]=useState({})
   const [loading, setLoading]=useState(false)
   const {enqueueSnackbar}= useSnackbar()

   useEffect(() => {
      const  getProjectUser = async () => {
         setLoading(true)
         try {
            const data ={
               uid_user:userUid
            }
            const response = await apiUser.getProjectUser(data)
            console.log('dataTableUser', response)
            setDataSource(response.data)
            setPagination({
               pageNo:response.data.total_page,
               pageSize:response.data.total,
            }
            )
         } catch (error) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
         setLoading(false)
      }
      getProjectUser()
   },[])

   const getProfileUser = async()=>{
      setLoading(true)
      try {
         const response = await apiUser.getProfileUser(userUid)
         setProfileUser(response.data)
      } catch (error) {
         console.log(error)
      }
      setLoading(false)
   }
   useEffect(()=>{
      getProfileUser()
   },[])
   return(
      <div>
         <Header
            title={profileUser.fullname ||'No name'}
            leftComponent={
               <button className='bnt_back' onClick={()=>{history.goBack()}}>
                  <IconBack/> Back
               </button>
            }
            // rightComponent={
            //    <HeaderRightAction icon={<IconAdd/>} />
            // }
         />
         <TableProjectUser
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
         />
      </div>
   )
}
export default DetailUser;
