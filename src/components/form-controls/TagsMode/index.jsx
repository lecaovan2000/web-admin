import CustomErrorMessage from '@/components/ErrorMessage'
import { Col, Divider, Form, Row, Select } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
TagsMode.propTypes = {}

function TagsMode(props) {
   const fieldRef = useRef(null)

   const { form, name, label, labelCol, rules, className, disabled, ...restProps } = props
   const {
      control,
      formState: { errors },
      setValue,
   } = form
   const { fields, append, remove } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name, // unique name for your Field Array
      keyName: 'id', //default to "id", you can change the key name
   })

   const options = useSelector(state => state.option)

   useEffect(() => {
      if (errors[name]) {
         console.log(errors[name])
         fieldRef.current.scrollIntoView()
      }
   }, [errors[name]])

   return (
      <Form.Item label={label} labelCol={labelCol} className={className || 'award-list'}>
         {fields.length <= 10 && !disabled && (
            <Row>
               <div
                  className={`btn btn__add ${disabled ? 'disabled' : ''}`}
                  style={{ float: 'left' }}
                  onClick={() => {
                     append({
                        tag: undefined,
                     })
                  }}
               ></div>
            </Row>
         )}
         <div className="input-item" ref={fieldRef}>
            {fields.map((field, index) => (
               <div key={field.id}>
                  {/* {index !== 0 && <Divider />} */}
                  <Row gutter={[24, 0]}>
                     <Col span={6}>
                        <Form.Item
                           labelCol={labelCol}
                           name={name}
                           className={className || 'input-award-list'}
                           colon={false}
                        >
                           <div className="input-item">
                              <Controller
                                 name={`${name}.${index}.tag`}
                                 control={control}
                                 render={({ field }) => {
                                    return (
                                       <Select
                                          {...field}
                                          mode="multiple"
                                          allowClear
                                          disabled={disabled}
                                          getPopupContainer={node => node.parentNode}
                                          suffixIcon={
                                             <svg
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M3.931 5a.8.8 0 00-.565 1.366l4.068 4.068a.8.8 0 001.132 0l4.068-4.068A.8.8 0 0012.07 5H3.93z"
                                                   fill="#65627A"
                                                />
                                             </svg>
                                          }
                                          menuItemSelectedIcon={
                                             <svg
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   fillRule="evenodd"
                                                   clipRule="evenodd"
                                                   d="M15.06 4L6 13.06.94 8 2 6.94l4 4 8-8L15.06 4z"
                                                   fill="#81B351"
                                                />
                                             </svg>
                                          }
                                          {...restProps}
                                          options={options.badges || []}
                                       />
                                    )
                                 }}
                              />
                              {/* <CustomErrorMessage
                                 errors={errors}
                                 name={`${name}.${index}.badge_list`}
                              /> */}
                           </div>
                        </Form.Item>
                     </Col>
                  </Row>
               </div>
            ))}
            {/* <CustomErrorMessage errors={errors} name={name} /> */}
         </div>
      </Form.Item>
   )
}

export default TagsMode
