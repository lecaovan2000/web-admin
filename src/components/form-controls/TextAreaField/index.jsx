import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';

TextAreaField.propTypes = {

};

function TextAreaField(props) {
   const { form, name, label, labelCol, rules, className, disabled, ...restProps } = props;
   const { control } = form;

   return (
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
            render={({ field, fieldState: { invalid, error } }) => (
               <div className="input-item">
                  <Input.TextArea
                     {...field}
                     {...restProps}
                     disabled={disabled}
                  />
                  <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
               </div>
            )}
         />
      </Form.Item>
   );
}

export default TextAreaField;