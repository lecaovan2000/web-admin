import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { DatePicker, Form, Input } from 'antd';
import { constants } from '@/constants/global';

DateField.propTypes = {

};

function DateField(props) {
   const { form, name, label, labelCol, rules, className, format, size, disabled, placeholder, ...restProps } = props;
   const { control } = form;

   return (
      <Form.Item
         label={label}
         labelCol={labelCol}
         name={name}
         rules={rules}
         colon={false}
      >
         <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { invalid, error } }) => {
               return (
                  <div className="input-item">
                     <DatePicker
                        {...field}

                        className={`ems-date-picker ${className ? className : ""}`}
                        dropdownClassName={`ems-picker-dropdown`}
                        disabled={disabled}
                        placeholder={placeholder ? placeholder : constants.dateFormat}
                        format={format ? format : constants.dateFormat}
                        allowClear={true}
                        size={size || 'middle'}
                        {...restProps}
                     />
                     <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
                  </div>
               )
            }}
         />
      </Form.Item>
   );
}

export default DateField;