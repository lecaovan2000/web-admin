import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
   form: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,

   label: PropTypes.string,
   labelCol: PropTypes.object,
   rules: PropTypes.array,
   className: PropTypes.string,
   disabled: PropTypes.bool,
};

function InputField(props) {
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
            render={({ field, fieldState: { invalid, error } }) => {
               return (
                  <div className="input-item">
                     <Input
                        {...field}
                        {...restProps}
                        disabled={disabled}
                     />
                     <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
                  </div>
               )
            }}
         />
      </Form.Item>
   );
}

export default InputField;