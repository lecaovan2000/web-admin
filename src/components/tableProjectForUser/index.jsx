import { Button, Space,Avatar, Image } from 'antd'
import { PictureOutlined } from '@ant-design/icons';
// import IconEyeViewDetail from '@/assets/icons/IconEyeViewDetail'
// import IconTrash from '@/assets/icons/IconTrash'
// import Confirm from '@/components/Confirm'
import SuperTable from '../../components/SuperTable'
import React, { useMemo, useState } from 'react'
import { common } from '../../utils/common'
import {tableUtil} from '../../utils/table' ;
// import { ContactsOutlined, DeleteOutlined } from '@ant-design/icons'

TableProjectUser.propTypes = {}

function TableProjectUser(props) {
   // const [isModalVisible, setIsModalVisible] = useState(false)
   // const [viewedUser, setViewedUser] = useState({})
   const handleChangePagination = (pageNo, pageSize) => {
      if (onPaginate) {
         onPaginate(pageNo, pageSize)
      }
   }
   const {
      loading,
      label,
      editable,
      dataSource,
      pagination,
      onPaginate,
      onTableChange,
      handleSearch,
      onRemoveUser,
      handleReset
   } = props

   const columns = useMemo(() => {
      return [
         {
            title:"Tên dự án",
            dataIndex:'title',
            key:'title',
            width:250,
            ...tableUtil.GetColumnSearchProps('title', handleSearch, handleReset),
            render: (_, record) => (
                <>
                   <Avatar
                      src={
                         record.img_info ? (
                            <Image src={record.img_info[0]} style={{ width: 40, backgroundSize:'cover' }} />
                         ) : null
                      }
                      shape="square"
                      icon={<PictureOutlined />}
                   />
                   <span style={{ marginLeft: 10 }}>{record.title}</span>
                </>
             )   
            
        },
   //      {
   //       title: 'Thông tin',
   //       dataIndex: 'note',
   //       key: 'note',
   //   },
      {
         title:"Giá bán",
         key:"price",
         dataIndex:"price",
         width:150,
         render:(_, record)=>{
          return <div>{common.formatPrice(record.price)}VND</div>
         }
      },
      {
          title:"Trạng thái",
          dataIndex:'status',
          key:'status',
          width:120,
          filters: [
            {
               text: 'Đang bán',
               value: true
            },
            {
               text: 'Đã bán',
               value: false
            }
         ],
          render:(_, record)=>{
            return record.status ? 
            (<div className='status_sale'>đang bán</div>):(<div className='status_sold'>đã bán</div>)
          } 
      },
      {
          title: 'Loại',
          dataIndex: 'type',
          key: 'type',
          width: 100,
          align: 'center',
          render: (_, record)=>{
            return record.type ==='BIET_THU'? <>Biệt thự</> :record.type==='NHA_VUON'?<>Nhà vườn</>:record.type==='NHA_PHO'?<>Nhà phố</>:record.type==='CHUNG_CU'?<>Chung cư</>:<>Căn hộ</>
          }
      },
      {
         title: 'Diện tích',
         dataIndex: 'acreage',
         key: 'acreage',
         width: 100,
         align: 'center',
         render:(_,record)=>{
            return <div>{record.acreage}m2</div>
         }
     },
      // {
      //     title: 'Hoạt  động',
      //     dataIndex: 'activity',
      //     key: 'activity',
      //     fixed: 'right',
      //     align: 'center',
      //     render: (_, record) => (
      //        <Space>
      //           <Button
      //              icon={<EditOutlined />}
      //              onClick={() => {
      //                 history.push(`/edit/${record.uid}`)
      //              }
      //             }
      //           />
      //           <Confirm
      //              className="confirm-modal"
      //              onConfirm={async () => {
      //                  try {
      //                      const data ={
      //                         uid:`${record.uid}`,
      //                         token:tokenUser
      //                      }
      //                     await newsApi.deleteNews(data)
      //                     history.go(0)
      //                  } catch (error) {
      //                     enqueueSnackbar(error.message, {
      //                         variant: 'error'
      //                      })
      //                  }
      //              }}
      //              placement="bottomRight"
      //              message={`Are you sure to delete ${record.title || 'project'} ?`}
      //           >
      //              <Button icon={<DeleteOutlined />} />
      //           </Confirm>
      //        </Space>
      //     )
      //  }
      ]
   }, [dataSource, editable])

   return (
      <div style={{ marginBottom: 20 }}>
         <div className="ant-col ant-col-24 ant-form-item-label">
            <label className="ant-form-item-no-colon" title={label}>
               {label}
            </label>
         </div>
         <SuperTable
            rowKey={record => record.uid + record.username}
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 'max-content', y: 300 }}
            submitting={loading}
            hasPagination={true}
            pagination={pagination}
            onPaginate={onPaginate}
            onChange={handleChangePagination}
         />
         {/* <DetailUserModal
            isOpen={isModalVisible}
            toggle={() => setIsModalVisible(!isModalVisible)}
            data={viewedUser}
         /> */}
      </div>
   )
}

export default TableProjectUser
