import React, { useEffect, useState } from 'react'
import apiUser from '../../../api/apiUser';
import { constants } from '../../../constants/global';
import TableUser from '../components/tableUser';
import { useSnackbar } from 'notistack';
import Header from '../../../components/Header';
import HeaderRightAction from '../../../components/Header/HeaderRightAction';
import IconAdd from '../../../assets/icons/IconAdd';
import DetailUser from './detailUser';
import { utilsToken } from '../../../utils/token';
import { useRouteMatch } from 'react-router-dom';
function ListUser(){
   const [loading, setLoading] = useState(false)
   const [dataSource, setDataSource] = useState([])
   const { enqueueSnackbar } = useSnackbar()
   const [pagination, setPagination] = useState(constants.DEFAULT_PAGINATION)
   const Token = utilsToken.getAccessToken()
   const {
      params: { userUid }
   } = useRouteMatch()
   console.log('UidUser',userUid)
   const getAllUser = async(pagination = constants.DEFAULT_PAGINATION)=>{
      setLoading(true)
      try {
         const payload={
            role:'CUSTOMER',
            page:pagination.pageNo,
            page_size:pagination.pageSize
         }
         const response = await apiUser.getAllUser(payload)
         setPagination({
            pageNo: response.total_page,
            pageSize: response.total,
         })
         console.log('data',response)
         setDataSource(response.data)
         
      } catch (error) {
         console.log('error', error)   
      }
      setLoading(false)
   }
   useEffect(()=>{
      getAllUser()
   },[])
   
   console.log('dataUser',dataSource)
   const handleStatusUser = async (activate, userUid) => {
      setLoading(true)
      try {
         const payload={
            token: Token,
            uid: userUid,
         }
         const response = await apiUser.showHide(payload, activate)
         enqueueSnackbar(response.message, {
            variant: 'success'
         })
         await getAllUser()
      } catch (error) {
         console.log('error', error)
         enqueueSnackbar(error.message, {
            variant: 'error'
         })
      }
      setLoading(false)
   }
   const handleChangePagination = (pageNo, pageSize) => {
      getAllUser({ pageNo, pageSize })
   }
   return(
      <div>
         <Header
            title='User'
            rightComponent={
               <HeaderRightAction icon={<IconAdd/>} />
            }
         />
         <TableUser
         loading={loading}
         dataSource={dataSource}
         onStatusChange={handleStatusUser}
         pagination={pagination}
         onPaginate={handleChangePagination}
         
      />
      </div>
      
   )
}
export default ListUser;