import IconTrash from '@/assets/icons/IconTrash';
import CustomErrorMessage from '@/components/ErrorMessage';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import InputField from '../InputField';
import NumberField from '../NumberField';
import TextAreaField from '../TextAreaField';
import './style.scss';
AwardField.propTypes = {

};

function AwardField(props) {
   const fieldRef = useRef(null)

   const { form, name, label, labelCol, rules, className, disabled, ...restProps } = props;
   const { control, formState: { errors }, setValue } = form;
   const { fields, append, remove } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name, // unique name for your Field Array
      keyName: "id", //default to "id", you can change the key name
   });

   const options = useSelector(state => state.option)

   useEffect(() => {
      if (errors[name]) {
         console.log(errors[name])
         fieldRef.current.scrollIntoView();
      }
   }, [errors[name]])

   return (
      <Form.Item
         label={label}
         labelCol={labelCol}
         className={className || 'award-list'}
      >
         {fields.length <= 10 && !disabled &&
            <Row>
               <div
                  className={`btn btn__add ${disabled ? 'disabled' : ''}`}
                  style={{ float: 'left' }}
                  onClick={() => {
                     append({
                        from_range: undefined,
                        to_range: undefined,
                        xp: undefined,
                        lucky_star: undefined,
                        badge_list: undefined,
                        cup: undefined,
                        key: undefined,
                        title: undefined,
                        description: undefined
                     })
                  }}
               >
                  <PlusOutlined />
                  <div>Add award</div>
               </div>
            </Row>
         }
         <div className="input-item" ref={fieldRef}>
            {
               fields.map((field, index) => (
                  <div key={field.id}>
                     {index !== 0 && <Divider />}
                     <Row>
                        <Col span={24}>
                           <InputField
                              form={form}
                              name={`${name}.${index}.title`}
                              label={"Tên"}
                              labelCol={labelCol}
                              className={className || 'input-award-list'}
                              disabled={disabled}
                              {...restProps}
                           />
                        </Col>
                     </Row>

                     <Row>
                        <Col span={24}>
                           <TextAreaField
                              form={form}
                              name={`${name}.${index}.description`}
                              label="Thông tin thêm"
                              labelCol={labelCol}
                              className={className || 'input-award-list'}
                              disabled={disabled}
                              {...restProps}
                           />
                        </Col>
                     </Row>
                     <Row gutter={[24, 0]}>
                        <Col span={4}>
                           <Form.Item
                              label="Mô tả range"
                              labelCol={labelCol}
                              name={name}
                              rules={rules}
                              className={className || 'input-award-list'}
                              colon={false}
                           >
                              <div className="input-item">
                                 <Input.Group compact>
                                    <Controller
                                       name={`${name}.${index}.from_range`}
                                       control={control}
                                       render={({ field }) => {
                                          return (
                                             <InputNumber
                                                prefix="From"
                                                style={{ width: 'calc((100% - 42px)/2)', textAlign: 'center', borderRadius: '8px 0 0 8px' }}
                                                {...field}
                                                {...restProps}
                                                disabled={disabled}
                                             />
                                          )
                                       }}
                                    />
                                    <Input
                                       className="site-input-split"
                                       style={{
                                          width: 40,
                                          height: 40,
                                          borderLeft: 0,
                                          borderRight: 0,
                                          pointerEvents: 'none',
                                       }}
                                       placeholder="—–"
                                       disabled
                                    />
                                    <Controller
                                       name={`${name}.${index}.to_range`}
                                       control={control}

                                       render={({ field }) => {
                                          return (
                                             <InputNumber
                                                prefix="To"
                                                className="site-input-right"
                                                style={{
                                                   width: 'calc((100% - 42px)/2)',
                                                   textAlign: 'center',
                                                   borderRadius: '0 8px 8px 0'
                                                }}
                                                {...field}
                                                {...restProps}
                                                disabled={disabled}
                                             />
                                          )
                                       }}
                                    />
                                 </Input.Group>
                                 <CustomErrorMessage errors={errors} name={`${name}.${index}.from_range`} />
                                 <CustomErrorMessage errors={errors} name={`${name}.${index}.to_range`} />
                              </div>
                           </Form.Item>
                        </Col>

                        <Col span={2}>
                           <NumberField
                              form={form}
                              name={`${name}.${index}.xp`}
                              label={"Điểm XP"}
                              labelCol={labelCol}
                              className={className || 'input-award-list'}
                              disabled={disabled}
                              {...restProps}
                           />
                        </Col>

                        <Col span={3}>
                           <NumberField
                              form={form}
                              name={`${name}.${index}.lucky_star`}
                              label={"Ngôi sao MM"}
                              labelCol={labelCol}
                              className={className || 'input-award-list'}
                              disabled={disabled}
                              {...restProps}
                           />
                        </Col>

                        <Col span={6}>
                           <Form.Item
                              label="Huy hiệu"
                              labelCol={labelCol}
                              name={name}
                              className={className || 'input-award-list'}
                              colon={false}
                           >
                              <div className="input-item">
                                 <Controller
                                    name={`${name}.${index}.badge_list`}
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
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                      d="M3.931 5a.8.8 0 00-.565 1.366l4.068 4.068a.8.8 0 001.132 0l4.068-4.068A.8.8 0 0012.07 5H3.93z"
                                                      fill="#65627A"
                                                   />
                                                </svg>
                                             }
                                             menuItemSelectedIcon={
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                 <CustomErrorMessage errors={errors} name={`${name}.${index}.badge_list`} />
                              </div>
                           </Form.Item>
                        </Col>

                        <Col span={4}>
                           <Controller
                              name={`${name}.${index}.cup`}
                              control={control}
                              render={({ field, fieldState: { invalid, error } }) => {
                                 return (
                                    <Form.Item
                                       label="Cúp"
                                       labelCol={labelCol}
                                       name={name}
                                       rules={rules}
                                       className={className || 'input-award-list'}
                                       colon={false}
                                    >
                                       <div className="input-item">
                                          <Select
                                             {...field}
                                             allowClear
                                             disabled={disabled}
                                             getPopupContainer={node => node.parentNode}
                                             suffixIcon={
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                      d="M3.931 5a.8.8 0 00-.565 1.366l4.068 4.068a.8.8 0 001.132 0l4.068-4.068A.8.8 0 0012.07 5H3.93z"
                                                      fill="#65627A"
                                                   />
                                                </svg>
                                             }
                                             menuItemSelectedIcon={
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                      fillRule="evenodd"
                                                      clipRule="evenodd"
                                                      d="M15.06 4L6 13.06.94 8 2 6.94l4 4 8-8L15.06 4z"
                                                      fill="#81B351"
                                                   />
                                                </svg>
                                             }
                                             options={options.cups || []}
                                             {...restProps}
                                          />
                                          <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
                                       </div>
                                    </Form.Item>
                                 )
                              }}
                           />
                        </Col>

                        <Col span={4}>
                           <InputField
                              form={form}
                              name={`${name}.${index}.key`}
                              label="Đặc biệt"
                              labelCol={labelCol}
                              className={className || 'input-award-list'}
                              disabled={disabled}
                              {...restProps}
                           />
                        </Col>

                        <Col span={1}>
                           <div style={{ height: '100%', display: 'flex', alignItems: 'end', paddingBottom: 8 }}>
                              {index > 0 &&
                                 <Button
                                    onClick={() => {
                                       remove(index)
                                    }}
                                    className="color--danger btn--no-outline"
                                    shape="circle"
                                    icon={<IconTrash />}
                                 />
                              }
                           </div>
                        </Col>
                     </Row>
                  </div>
               ))
            }
            <CustomErrorMessage errors={errors} name={name} />
         </div>
      </Form.Item>
   );
}

export default AwardField;