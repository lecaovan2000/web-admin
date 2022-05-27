import React, { useEffect, useState } from "react";
import apiNews from '../../../api/apiNews'
import { constants } from "../../../constants/global";
import NewsListTable from "../component/newsListTable";
import AddNewsModal from "../component/addNewsModal";
import Header from "../../../components/Header";
import HeaderRightAction from "../../../components/Header/HeaderRightAction";
import IconAdd from "../../../assets/icons/IconAdd";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { utilsToken } from "../../../utils/token";

function NewsList(){
const [pagination, setPagination]=useState(constants.DEFAULT_PAGINATION_NEWS)
const [dataSource,setDataSource]=useState({})
const [isOpen, setIsOpen]=useState(false)
const { enqueueSnackbar } = useSnackbar()
const history = useHistory()
const token = utilsToken.getAccessToken()

   const getNewsPaper = async(pagination= constants.DEFAULT_PAGINATION_NEWS)=>{
      try {
         const payload={
            page:pagination.pageNo,
            page_size:pagination.pageSize
         }
         const response = await apiNews.getAllNews(payload)
         setDataSource(response.data)
         setPagination({
            pageNo: response.total_page,
            pageSize: response.total,
         })
      } catch (error) {
         console.log('errr',error)
      }
   }
   useEffect(()=>{
      getNewsPaper()
   },[])

   const handleAddNews = async (data)=>{
      console.log('data add newPaper',data)
      const payload={
         title:data.title,
         content:data.content,
         token:token,
         cover:data.cover[0].originFileObj
      }
      
      try {
         const response = await apiNews.addNewsPaper(payload)
         setIsOpen(false)
         history.go(0)
         enqueueSnackbar(response.message, {
            variant: 'success'
         })
      } catch (error) {
         enqueueSnackbar(error.message, {
            variant: 'error'
         })
      }
   }
   const handleChangePagination = (pageNo, pageSize) => {
      getNewsPaper({ pageNo, pageSize })
   }
   return(
      <>
      <Header
         title='News'
         rightComponent={
            <HeaderRightAction icon={<IconAdd/>} onClick={()=>{setIsOpen(true)}} />
         }/>
         <NewsListTable
            dataSource={dataSource}
            pagination={pagination}
            onPaginate={handleChangePagination}
         />
         <AddNewsModal
            isOpen={isOpen}
            toggle={()=>setIsOpen(!isOpen)}
            onSubmit={handleAddNews}
            
         />
      </>
   )
}export default NewsList;
