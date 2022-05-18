import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { ColumnGroup } from 'rc-table'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Select } from 'antd'

SelectField.propTypes = {
   form: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,

   label: PropTypes.string,
   labelCol: PropTypes.object,
   rules: PropTypes.array,
   className: PropTypes.string,
   disabled: PropTypes.bool,
}

function SelectField(props) {
   const { form, name, label, labelCol, className, disabled, mode, options, ...restProps } = props
   const { control } = form

   return (
      <Form.Item
         label={label}
         labelCol={labelCol || { span: 24 }}
         name={name}
         className={className || ''}
         colon={false}
      >
         <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { invalid, error } }) => {
               return (
                  <div className="input-item">
                     <Select
                        {...field}
                        defaultValue={field.value}
                        mode={mode}
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
                        options={options}
                     />
                     <div className={`error-message ${!invalid ? 'hide' : ''}`}>
                        {error?.message || ' '}
                     </div>
                  </div>
               )
            }}
         />
      </Form.Item>
   )
}

export default SelectField
