import React from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'
import { Button, Col, Divider, Form, Row } from 'antd'
import InputField from '../InputField'
import CustomErrorMessage from '@/components/ErrorMessage'
import { PlusOutlined } from '@ant-design/icons'
import IconTrash from '@/assets/icons/IconTrash'
import FileUploadField from '../FileUploadField'
import DirectoryFile from '@/constants/enums/DirectoryFile'

QuestionHintField.propTypes = {}

function QuestionHintField(props) {
   const { form, name, label, labelCol, rules, className, disabled = false, ...restProps } = props
   const {
      control,
      formState: { errors },
   } = form
   const { fields, append, remove } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name, // unique name for your Field Array
      keyName: 'id', //default to "id", you can change the key name
   })
   return (
      <Form.Item label={label} labelCol={labelCol} className={className || 'award-list'}>
         {!disabled && (
            <Row>
               <div
                  className={`btn btn__add ${disabled ? 'disabled' : ''}`}
                  style={{ float: 'left' }}
                  onClick={() => {
                     append({
                        description: undefined,
                     })
                  }}
               >
                  <PlusOutlined />
                  <div>Add Hint</div>
               </div>
            </Row>
         )}
         <div className="input-item">
            {fields.map((field, index) => (
               <div key={field.id}>
                  {index !== 0 && <Divider />}
                  <Row gutter={[24, 12]}>
                     <Col span={23}>
                        <InputField
                           form={form}
                           name={`${name}.${index}.description`}
                           label={'Mô tả'}
                           labelCol={labelCol}
                           className={className || 'input-award-list'}
                           disabled={disabled}
                           {...restProps}
                        />
                     </Col>
                     <Col span={1}>
                        <div
                           style={{
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              paddingTop: 35,
                           }}
                        >
                           <Button
                              onClick={() => {
                                 remove(index)
                              }}
                              className="color--danger btn--no-outline"
                              shape="circle"
                              icon={<IconTrash />}
                           />
                        </div>
                     </Col>
                  </Row>
                  <Row>
                     <Col span={24}>
                        <FileUploadField
                           name={`${name}.${index}.file`}
                           form={form}
                           directory={DirectoryFile.QUESTION}
                           label="File"
                           labelCol={{ span: 24 }}
                           maxItem={1}
                           accept="image/*"
                        />
                     </Col>
                  </Row>
               </div>
            ))}
         </div>
         <CustomErrorMessage errors={errors} name={name} />
      </Form.Item>
   )
}

export default QuestionHintField
