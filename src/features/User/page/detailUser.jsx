import React, { useState,useEffect } from "react";
import { useRouteMatch } from 'react-router-dom'
import Header from "../../../components/Header";
import TableProjectUser from "../../../components/tableProjectForUser";
import apiUser from "../../../api/apiUser";
import { useSnackbar } from "notistack";
import IconBack from "../../../assets/icons/IconBack";
import { useHistory } from "react-router-dom";
import { constants } from "../../../constants/global";
// import { utilsToken } from "../../../utils/token";

function DetailUser(){
   const {
      params: { userUid }
   } = useRouteMatch()
   const history = useHistory()
   const [pagination, setPagination] = useState(constants.DEFAULT_PAGINATION)

   const [dataSource, setDataSource] =useState({})
   const [profileUser, setProfileUser]=useState({})
   const [loading, setLoading]=useState(false)
   const {enqueueSnackbar}= useSnackbar()

   
      const  getAllProjectUser = async (pagination= constants.DEFAULT_PAGINATION_PROJECT_USER) => {
         setLoading(true)
         try {
            const data ={
               uid_user:userUid,
               page:pagination.pageNo,
               page_size:pagination.pageSize
            }
            const response = await apiUser.getProjectUser(data)
            console.log('data Table User', response)
            setDataSource(response.data)
            setPagination({
               pageNo: response.total_page,
               pageSize:response.total,
            })
         } catch (error) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
         setLoading(false)
      }
      useEffect(() => {
      getAllProjectUser()
   },[])
   const handleChangePagination = (pageNo, pageSize) => {
      getAllProjectUser({ pageNo, pageSize })
   }
   
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
            title={`User: ${profileUser.fullname}` ||'No name'}
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
            label='Danh sách dự án user:'
            onPaginate={handleChangePagination}
         />
      </div>
   )
}
export default DetailUser;
