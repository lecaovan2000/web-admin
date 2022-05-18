import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormModal from '@/components/CustomModal/FormModal'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Modal, Button } from 'antd'
import InputField from '../InputField'
import TextAreaField from '../TextAreaField'
import NumberField from '../NumberField'
import SwitchField from '../SwitchField'
import DateField from '../DateField'
import { messages } from '@/constants/messages'
import { constants } from '@/constants/global'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { common } from '@/utils/common'
import FileUploadField from '../FileUploadField'
import DirectoryFile from '@/constants/enums/DirectoryFile'
import QuestionAnswerField from './QuestionAnswerField'
import QuestionHintField from './QuestionHintFIeld'
import KryptosType from '@/constants/enums/KryptosType'
import SelectField from '../SelectField'

AddEditQuestionModal.propTypes = {
   data: PropTypes.object,
   isOpen: PropTypes.bool.isRequired,
   toggle: PropTypes.func.isRequired,
   onSubmit: PropTypes.func.isRequired,
   onDelete: PropTypes.func
}

AddEditQuestionModal.defaultProps = {
   data: {}
}

function AddEditQuestionModal(props) {
   const { data, isOpen, toggle, onSubmit, onDelete } = props
   const disabled = !!data.deleted

   const schema = yup.object().shape({
      title: yup.string().required(messages.REQUIRED_FIELD),
      kryptos_type: yup.string().required(messages.REQUIRED_FIELD),
      ban_van: yup.string().nullable(),
      ban_van_image_url: yup
         .string()
         .test('is-url-1', messages.FORMAT_URL, value => {
            if (!value) return true
            return constants.urlRegex.test(value)
         })
         .nullable(),
      description: yup.string().nullable(),
      notes: yup.string().nullable(),
      gain_xp: yup.number().integer().min(0).required(messages.REQUIRED_FIELD),
      difficult: yup.number().integer().min(0).required(messages.REQUIRED_FIELD),
      user_level_to_play: yup.number().integer().min(0).required(messages.REQUIRED_FIELD),
      lock_time_minutes: yup.number().integer().min(0).required(messages.REQUIRED_FIELD),
      tried_time: yup.number().integer().min(0).required(messages.REQUIRED_FIELD),
      lock_if_wrong_answer: yup.boolean().default(false),
      published_at: yup.date().nullable(),
      due_at: yup.date().nullable(),
      key: yup.string().required(messages.REQUIRED_FIELD),
      tutorial_link: yup
         .string()
         .test('is-url', messages.FORMAT_URL, value => {
            if (!value) return true
            return constants.urlRegex.test(value)
         })
         .nullable(),
      external_link: yup
         .string()
         .test('is-url-2', messages.FORMAT_URL, value => {
            if (!value) return true
            return constants.urlRegex.test(value)
         })
         .nullable(),
      banner: yup.array().max(1),
      media_list: yup.array(),
      answer_message: yup.string().nullable(),
      answer_list: yup.array().of(
         yup.object().shape({
            answer_code: yup.string().required(messages.REQUIRED_FIELD),
            description: yup.string().nullable(),
            explanation: yup.string().nullable(),
            file: yup.array().max(1),
            correct: yup.boolean().required(messages.REQUIRED_FIELD)
         })
      ),
      hint_list: yup.array().of(
         yup.object().shape({
            description: yup.string(),
            file: yup.array().min(1).max(1)
         })
      )
   })
   const form = useForm({
      resolver: yupResolver(schema)
   })

   useEffect(() => {
      form.reset({
         ...data,
         lock_if_wrong_answer: data.lock_if_wrong_answer || false,
         published_at: data.published_at ? common.convertDateToMoment(data.published_at) : null,
         due_at: data.due_at ? common.convertDateToMoment(data.due_at) : null,
         banner: data.banner ? [common.convertToFileObject(data.banner)] : [],
         media_list: data.media_list
            ? data.media_list.map(item => common.convertToFileObject(item))
            : [],
         answer_list:
            data.answer_list && data.answer_list.length > 0
               ? data.answer_list.map(item => ({
                    answer_code: item.answer_code,
                    description: item.description,
                    explanation: item.explanation,
                    file: item.file ? [common.convertToFileObject(item.file)] : [],
                    correct: item.correct
                 }))
               : [
                    {
                       answer_code: '',
                       description: '',
                       explanation: '',
                       file: [],
                       correct: true
                    }
                 ],
         hint_list: data.hint_list
            ? data.hint_list.map(item => ({
                 description: item.description,
                 file: item.file ? [common.convertToFileObject(item.file)] : []
              }))
            : []
      })
   }, [data, form])

   const handleSubmit = async data => {
      Modal.confirm({
         title: 'Are you sure to update this question?',
         icon: <ExclamationCircleOutlined />,
         onOk: async () => {
            if (onSubmit) {
               const isSuccess = await onSubmit(data)
               if (isSuccess) {
                  toggle()
               }
            }
         },
         onCancel() {
            return
         }
      })
   }

   const handleDelete = async () => {
      Modal.confirm({
         title: 'Are you sure to delete this question?',
         icon: <ExclamationCircleOutlined />,
         onOk: async () => {
            if (onDelete) {
               const isSuccess = await onDelete(data.uid)
               if (isSuccess) {
                  toggle()
               }
            }
         },
         onCancel() {
            return
         }
      })
   }

   return (
      <FormModal
         title={`${data.uid ? 'Edit' : 'Add'} question`}
         footerTexts={!disabled ? ['Cancel', 'Save'] : []}
         isOpen={isOpen}
         toggle={toggle}
         onPrimarySubmit={form.handleSubmit(handleSubmit)}
         form={form}
         width={1000}
         style={{ top: 80 }}
      >
         {onDelete && !data?.deleted && (
            <Row justify="end">
               <Button
                  icon={<DeleteOutlined />}
                  danger
                  type="text"
                  style={{ border: 'none' }}
                  onClick={handleDelete}
               >
                  Delete question
               </Button>
            </Row>
         )}
         <form>
            <Row gutter={[24, 0]}>
               <Col span={16}>
                  <InputField
                     size="large"
                     name="title"
                     form={form}
                     placeholder="Tiêu đề"
                     label="Tiêu đề"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={8}>
                  <SelectField
                     size="large"
                     name="kryptos_type"
                     form={form}
                     label="Kryptos Type"
                     labelCol={{ span: 24 }}
                     options={[
                        {
                           label: KryptosType.QUIZ,
                           value: KryptosType.QUIZ
                        },
                        {
                           label: KryptosType.TEXT,
                           value: KryptosType.TEXT
                        },
                        {
                           label: KryptosType.NUMBER,
                           value: KryptosType.NUMBER
                        },
                        {
                           label: KryptosType.MULTISELECT,
                           value: KryptosType.MULTISELECT
                        }
                     ]}
                  />
               </Col>
            </Row>

            <Row gutter={[24, 0]}>
               <Col span={8}>
                  <InputField
                     size="large"
                     name="ban_van"
                     form={form}
                     placeholder="Chìa khóa giải"
                     label="Chìa khóa giải"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={16}>
                  <InputField
                     size="large"
                     name="ban_van_image_url"
                     form={form}
                     placeholder="Link ảnh chìa khóa giải"
                     label="Link ảnh chìa khóa giải"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>

            <Row>
               <Col span={24}>
                  <TextAreaField
                     size="large"
                     name="description"
                     form={form}
                     placeholder="Mô tả"
                     label="Mô tả"
                     labelCol={{ span: 24 }}
                     autoSize={{
                        minRows: 2,
                        maxRows: 8
                     }}
                     disabled={disabled}
                  />
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <TextAreaField
                     size="large"
                     name="notes"
                     form={form}
                     placeholder="Ghi chú"
                     label="Ghi chú"
                     labelCol={{ span: 24 }}
                     autoSize={{
                        minRows: 2,
                        maxRows: 6
                     }}
                     disabled={disabled}
                  />
               </Col>
            </Row>

            <Row>
               <Col span={3}>
                  <NumberField
                     size="large"
                     name="gain_xp"
                     form={form}
                     placeholder="XP thu được"
                     label="XP thu được"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={3} offset={1}>
                  <NumberField
                     size="large"
                     name="difficult"
                     form={form}
                     placeholder="Độ khó"
                     label="Độ khó"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={3} offset={1}>
                  <NumberField
                     size="large"
                     name="user_level_to_play"
                     form={form}
                     placeholder="Cấp user chơi"
                     label="Cấp user chơi"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={6} offset={2}>
                  <NumberField
                     size="large"
                     name="lock_time_minutes"
                     form={form}
                     placeholder="Thời gian khóa (phút)"
                     label="Thời gian khóa (phút)"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>

               <Col span={4} offset={1}>
                  <NumberField
                     size="large"
                     name="tried_time"
                     form={form}
                     placeholder="Số lần thử"
                     label="Số lần thử"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>

            <Row>
               <Col span={5}>
                  <DateField
                     size="large"
                     name="published_at"
                     form={form}
                     label="Ngày xuất bản"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={5} offset={1}>
                  <DateField
                     size="large"
                     name="due_at"
                     form={form}
                     label="Ngày hết hạn"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={6} offset={2}>
                  <InputField
                     size="large"
                     name="key"
                     form={form}
                     placeholder="Key"
                     label="Key (cách nhau bởi dấu phẩy)"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={4} offset={1}>
                  <SwitchField
                     size="large"
                     name="lock_if_wrong_answer"
                     form={form}
                     placeholder="Khóa nếu trả lời sai"
                     label="Khóa nếu trả lời sai"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>

            <Row>
               <Col span={11}>
                  <InputField
                     size="large"
                     name="tutorial_link"
                     form={form}
                     placeholder="Link tutorial"
                     label="Link tutorial"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
               <Col span={11} offset={2}>
                  <InputField
                     size="large"
                     name="external_link"
                     form={form}
                     placeholder="External link"
                     label="External link"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <FileUploadField
                     name="banner"
                     form={form}
                     directory={DirectoryFile.QUESTION}
                     label="Banner"
                     labelCol={{ span: 24 }}
                     maxItem={1}
                     disabled={false}
                     accept="image/*"
                     disabled={disabled}
                  />
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <FileUploadField
                     name="media_list"
                     form={form}
                     directory={DirectoryFile.QUESTION}
                     label="Hình ảnh"
                     labelCol={{ span: 24 }}
                     maxItem={5}
                     disabled={false}
                     accept="image/*"
                     disabled={disabled}
                  />
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <InputField
                     size="large"
                     name="answer_message"
                     form={form}
                     placeholder="Answer Message"
                     label="Answer Message"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <QuestionAnswerField
                     size="large"
                     name="answer_list"
                     form={form}
                     label="Đáp án"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <QuestionHintField
                     size="large"
                     name="hint_list"
                     form={form}
                     label="Hint"
                     labelCol={{ span: 24 }}
                     disabled={disabled}
                  />
               </Col>
            </Row>
         </form>
      </FormModal>
   )
}

export default AddEditQuestionModal
