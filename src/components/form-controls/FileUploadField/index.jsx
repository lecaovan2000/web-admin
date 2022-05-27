import {React,useEffect, useState} from 'react'
import{Form, message, Upload, Button} from 'antd'
import {Controller} from 'react-hook-form'
import { UploadOutlined } from '@ant-design/icons';

function FileUploadField(props){
   const {form, label, labelCol,width, name, rules, disabled, className,size,maxLength,style,maxCount}= props;
   const { control,getValues, setValue } = form;
   const [fileList, setFileList] = useState([])
   // const mediaList = getValues(name)

  const onChange=(info)=> {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
   }

   const handleChange = ({ fileList }) => {
      setFileList(fileList)
      setValue(name, fileList)
   }
   console.log('medalist',fileList)
   return(
      <Form.Item
         label={label}
         labelCol={labelCol}
         name={name}
         rules={rules}
         className={className || ''}
         colon={false}
      >
         <Controller 
            name={name}
            control={control}
            render={({field:{ onChange, name },fieldState:{error}})=>{
               return(
                  <div className='input-item'>
                     <Upload
                        name={name}
                        multiple
                        beforeUpload={() => false}
                        maxCount={maxCount}
                        listType="picture-card"
                        onChange={e => {
                           const { fileList } = e
                           onChange(fileList)
                           handleChange(e)
                        }}
                        defaultFileList={[...fileList]}
                        
                        
                     >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                     </Upload>
                     <div>{error?.message || ''}</div>
                  </div>
               )
            }}
         />
      </Form.Item>
   )
}
export default FileUploadField