import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Input, Form } from 'antd';
import IconEye from '../../../assets/icons/IconEye';
import IconEyeClose from '../../../assets/icons/IconEyeClose';

PasswordField.propTypes = {
   form: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,

   label: PropTypes.string,
   labelCol: PropTypes.object,
   rules: PropTypes.array,
   className: PropTypes.string,
   disabled: PropTypes.bool,
};

function PasswordField(props) {
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
                  <Input.Password
                     {...field}
                     {...restProps}
                     disabled={disabled}
                     iconRender={visible => visible ? <IconEye /> : <IconEyeClose />}
                  />
                  <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
               </div>
            )}
         />
      </Form.Item>
   );
}

export default PasswordField;