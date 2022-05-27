import React,{useMemo} from 'react'
import SuperTable from '../../../components/SuperTable';
import { Avatar,Button,Image, Switch } from 'antd'
import {EditOutlined, EyeOutlined,PictureOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { common } from '../../../utils/common';

function NewsListTable(props){
   const {dataSource,pagination,onPaginate,onTableChange,onStatusChange}=props
   const handleChangePagination = (pageNo, pageSize) => {
      if (onPaginate) {
         onPaginate(pageNo, pageSize)
      }
   }
   const history = useHistory()
   const columns = useMemo(()=>{
      return[
         {
            title: 'Bản tin',
            key: 'title',
            dataIndex: 'title',
            width:300,
            render: (_,record)=>(
               <>
                  <Avatar
                     src={
                        record.cover ? (
                           <Image src={record.cover} style={{ width: 50, backgroundSize:'cover' }} />
                        ) : <Image src='https://joeschmoe.io/api/v1/random' style={{ width: 40, backgroundSize:'cover' }}/>
                     }
                     shape="square"
                     icon={<PictureOutlined/>}
                  />
                  <span style={{ marginLeft: 10 }}>{record.title}</span>
               </>
            )
         },
         {
            title: 'Nội dung',
            key: 'content',
            dataIndex: 'content',
         },
         {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render:(_,record)=>record.status?<div style={{color:'blue'}} >Hoạt động</div>:<div style={{color:'red'}} >Khóa</div>
         },
         {
            title: 'Ngày đăng',
            key: 'created_at',
            dataIndex: 'created_at',
            render:(record)=>(
               <span>{common.convertBirthdayToDate(record)}</span>
            )
         },
         {
            title: 'Hoạt động',
            key: 'work',
            dataIndex: 'work',
            render:(_,record)=>(
               <div>
                  <Button title='View profile' ><EyeOutlined/></Button>
                  {/* <Switch
                     checkedChildren="Block"
                     unCheckedChildren="UnBlock"
                     checked={record.activate}
                     onClick={async e => await clickStatusUser(e, record.uid)}
                  /> */}
               </div>
            )
         },

         
      ]
   })
   const clickStatusUser = (value, uid) => {
      if (onStatusChange) {
         onStatusChange(value, uid)
         
      }
      
   }
   return(
      <SuperTable 
         columns={columns}
         // hasPagination={true}
         dataSource={dataSource}
         // pagination={pagination}
         // onPaginate={onPaginate}
         // onChange={onTableChange}
         // onChange={handleChangePagination}
         scroll={{ x:'max-content'}}
      />
   )
}
export default NewsListTable;