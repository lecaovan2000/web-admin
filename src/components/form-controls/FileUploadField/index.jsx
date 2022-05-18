import mediaApi from '@/api/mediaApi'
import { common } from '@/utils/common'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Modal, Row, Upload } from 'antd'
import UploadList from 'antd/es/upload/UploadList'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState, useRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Controller } from 'react-hook-form'
import './style.scss'
FileUploadField.propTypes = {}

function FileUploadField(props) {
   const { enqueueSnackbar } = useSnackbar()
   const fieldRef = useRef(null)
   const {
      form,
      name,
      label,
      labelCol,
      className,
      directory,
      disabled = false,
      maxItem,
      accept
   } = props
   const {
      control,
      setValue,
      getValues,
      formState: { errors }
   } = form

   const [previewVisible, setPreviewVisible] = useState(false)
   const [previewImage, setPreviewImage] = useState('')
   const [previewTitle, setPreviewTitle] = useState('')
   const [fileList, setFileList] = useState([])
   const uploadButton = (
      <Row>
         <div className="btn btn__add" style={{ float: 'left' }}>
            <PlusOutlined />
            <div>Upload</div>
         </div>
      </Row>
   )

   const renderTitle = data => {
      if (!data.originFileObj) {
         return data.uid
      } else {
         if (data.status === 'done' && data.response) {
            return data.response.uid
         } else {
            return data.status
         }
      }
   }

   const handleCancel = () => setPreviewVisible(false)
   const handlePreview = async file => {
      if (!file.url && !file.preview) {
         file.preview = await common.getBase64(file.originFileObj)
      }
      setPreviewImage(file.url || file.preview)
      setPreviewVisible(true)
      setPreviewTitle(file.uid || file.response.uid)
      // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
   }

   const handleChange = ({ fileList }) => {
      setFileList(fileList)
      setValue(name, fileList)
   }

   const uploadImage = async options => {
      const { onSuccess, onError, file, onProgress } = options

      try {
         const payload = {
            media: file,
            file_name: common.getFileName(file.name),
            directory
         }

         const response = await mediaApi.upload(payload, onProgress)
         const data = response.data
         // console.log('data', data)
         onSuccess(data)
      } catch (error) {
         const newError = new Error('Some error')
         onError({ newError })
         enqueueSnackbar(error.message, {
            variant: 'error'
         })
      }
   }
   const onDragEnd = ({ source, destination }) => {
      if (!destination) return
      const reorder = (list, startIndex, endIndex) => {
         const [removed] = list.splice(startIndex, 1)
         list.splice(endIndex, 0, removed)

         return list
      }
      const newFileList = reorder([...fileList], source.index, destination.index)
      handleChange({ fileList: newFileList })
   }
   const onRemove = file => {
      const newFileList = [...fileList].filter(item => item.uid !== file.uid)
      handleChange({ fileList: newFileList })
   }

   const getListStyle = isDraggingOver => ({
      background: '#f9f9f9',
      display: 'flex',
      flexWrap: 'wrap',
      padding: 8 * 2,
      overflow: 'auto',
      height: '150px',
      borderRadius: '8px',
      border: `1px solid ${isDraggingOver ? '#1768b2' : '#dbdbdb'}`,
      marginTop: 12,
      marginBottom: 24
   })
   const getItemStyle = (index, isDragging, draggableStyle) => ({
      userSelect: 'none',
      padding: 0,
      margin: 4,
      height: 104,
      width: 104,
      background: index === 0 ? '#fff' : isDragging ? 'transparent' : '#f9f9f9',
      borderRadius: 2,
      ...draggableStyle
   })

   const mediaList = getValues(name)

   useEffect(() => {
      if (mediaList) {
         handleChange({ fileList: mediaList })
      }
   }, [mediaList])

   useEffect(() => {
      if (errors[name]) {
         fieldRef.current.scrollIntoView()
      }
   }, [errors[name]])

   return (
      <>
         <Form.Item
            label={label}
            labelCol={labelCol}
            name={name}
            className={className || ''}
            colon={false}
            style={{ marginBottom: 0 }}
         >
            <Controller
               name={name}
               control={control}
               render={({ field: { onChange, name }, fieldState: { invalid, error } }) => {
                  return (
                     <div className="input-item" ref={fieldRef}>
                        <Upload
                           name={name}
                           customRequest={uploadImage}
                           fileList={fileList}
                           showUploadList={false}
                           onChange={e => {
                              const { fileList } = e
                              // setValue(name, fileList)
                              onChange(fileList)
                              handleChange(e)
                           }}
                           multiple
                           disabled={disabled}
                           accept={accept}
                        >
                           {fileList.length <= maxItem && !disabled ? uploadButton : null}
                        </Upload>
                        <div className={`error-message ${!invalid ? 'hide' : ''}`}>
                           {error?.message || ' '}
                        </div>
                     </div>
                  )
               }}
            />
         </Form.Item>

         {fileList && (
            <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                     <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                     >
                        {fileList.map((item, index) => (
                           <Draggable
                              key={item.uid}
                              draggableId={item.uid}
                              index={index}
                              isDragDisabled={disabled}
                           >
                              {(provided, snapshot) => (
                                 <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                       index,
                                       snapshot.isDragging,
                                       provided.draggableProps.style
                                    )}
                                 >
                                    <UploadList
                                       locale={{ previewFile: 'preview', removeFile: 'remove' }}
                                       showDownloadIcon={false}
                                       listType={'picture-card'}
                                       onPreview={handlePreview}
                                       onRemove={onRemove}
                                       items={[item]}
                                       showRemoveIcon={!disabled}
                                    />
                                    <p
                                       style={{
                                          marginBottom: 0,
                                          marginTop: -8,
                                          textAlign: 'center'
                                       }}
                                    >
                                       {renderTitle(item)}
                                    </p>
                                 </div>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
         )}

         <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="preview" style={{ width: '100%' }} src={previewImage} />
         </Modal>
      </>
   )
}

export default FileUploadField
