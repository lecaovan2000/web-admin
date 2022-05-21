import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'antd'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '../form-controls/InputField'
import { yupResolver } from '@hookform/resolvers/yup'

SearchUserForm.propTypes = {
   onSubmit: PropTypes.func.isRequired
}

function SearchUserForm({ onSubmit }) {
   const schema = yup.object().shape({
      search: yup.string()
   })
   const form = useForm({
      resolver: yupResolver(schema)
   })
   const {
      formState: { isSubmitting }
   } = form

   const handleSubmit = async _data => {
      if (onSubmit) await onSubmit(_data)
   }

   return (
      <form onSubmit={form.handleSubmit(handleSubmit)} className="search-user">
         <Row justify="start" gutter={[24, 0]}>
            <Col span={10}>
               <InputField
                  size="large"
                  name="search"
                  form={form}
                  placeholder="Search users"
                  label=""
                  labelCol={{ span: 0 }}
               />
            </Col>
            <Button htmlType="submit" type="primary" size="large" loading={isSubmitting}>
               Search
            </Button>
         </Row>
      </form>
   )
}

export default SearchUserForm
