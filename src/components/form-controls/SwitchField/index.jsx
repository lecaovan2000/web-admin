import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Form, Input, Switch } from 'antd';

SwitchField.propTypes = {
   form: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,

   label: PropTypes.string,
   labelCol: PropTypes.object,
   rules: PropTypes.array,
   className: PropTypes.string,
   disabled: PropTypes.bool,
};

function SwitchField(props) {
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
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, error } }) => (
               <div className="input-item">
                  <Switch
                     ref={ref}
                     onChange={(checked) => onChange(checked)}
                     onBlur={onBlur}
                     name={name}
                     checked={value}
                     disabled={disabled}

                     {...restProps}
                  />
                  <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
               </div>
            )}
         />
      </Form.Item>
   );
}

export default SwitchField;