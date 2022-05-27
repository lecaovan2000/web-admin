import React, { useEffect, useState } from "react";
import apiNews from "../../../api/apiNews";
import { constants } from "../../../constants/global";
import NewsListTable from "../component/newsListTable";

function NewsList(){
   // const [pagination, setPagination]=(pagination=constants.DEFAULT_PAGINATION_NEWS)
const [dataSource,setDataSource]=useState({})
   const getNewsPaper = async()=>{
      try {
         const response = await apiNews.getAllNews()
         setDataSource(response.data)
      } catch (error) {
         console.log('errr',error)
      }
   }
   useEffect(()=>{
      getNewsPaper()
   },[])
   return(
      <>
         <NewsListTable
            dataSource={dataSource}
         />
      </>
   )
}export default NewsList;
