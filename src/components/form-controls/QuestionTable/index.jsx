import SuperTable from '@/components/SuperTable'
import { PictureOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import AddEditQuestionModal from './AddEditQuestionModal'
import './style.scss'

QuestionTable.propTypes = {}

const columns = [
   {
      title: 'STT',
      dataIndex: 'index',
      width: 60,
      render: (_, _record, idx) => <span>{idx + 1}</span>,
      fixed: 'left',
      align: 'center'
   },
   {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 150,
      render: (_, record) => (
         <>
            <Avatar
               src={
                  record.banner ? (
                     <Image src={record.banner.media_url} style={{ width: 32 }} />
                  ) : null
               }
               shape="square"
               icon={<PictureOutlined />}
            />
            <span style={{ marginLeft: 10 }}>{record.title}</span>
         </>
      )
   },
   {
      title: 'Chìa khóa',
      dataIndex: 'ban_van',
      key: 'ban_van',
      ellipsis: true,
      width: 200
   },
   {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
   },
   {
      title: 'Đáp án',
      dataIndex: 'answer_message',
      key: 'answer_message',
      ellipsis: true,
      width: 200
   },
   {
      title: 'Độ khó',
      dataIndex: 'difficult',
      key: 'difficult',
      ellipsis: true,
      width: 80
   }
]

function QuestionTable(props) {
   // modal variables
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
   const [editQuestion, setEditQuestion] = useState({})

   // Table vars
   const { loading, label, data, onUpdateQuestion, onDeleteQuestion, editable = true } = props
   const [dataSource, setDataSource] = useState([])

   useEffect(() => {
      setDataSource(data)
   }, [data])

   return (
      <div style={{ marginTop: 10 }}>
         {label && (
            <div className="ant-col ant-col-24 ant-form-item-label">
               <label className="ant-form-item-no-colon">{label}</label>
            </div>
         )}
         <SuperTable
            rowClassName={record => (record.deleted ? 'row--low-opacity' : '')}
            pagination={false}
            rowKey="uid"
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1000, y: 300 }}
            submitting={loading}
            onRow={record => {
               return {
                  onDoubleClick: () => {
                     if (!editable) return
                     console.log(record)
                     setEditQuestion(record)
                     setIsEditModalOpen(!isEditModalOpen)
                  }
               }
            }}
         />

         <AddEditQuestionModal
            data={editQuestion}
            isOpen={isEditModalOpen}
            toggle={() => {
               setIsEditModalOpen(!isEditModalOpen)
               setEditQuestion({})
            }}
            onSubmit={onUpdateQuestion}
            onDelete={onDeleteQuestion}
         />
      </div>
   )
}

export default QuestionTable
