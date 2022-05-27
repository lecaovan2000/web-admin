import {React} from 'react'
import FormModal from '../../../components/CustomModal/FormModal'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { Col, Row, Modal } from 'antd'
import InputField from '../../../components/form-controls/InputField'
import FileUploadField from '../../../components/form-controls/FileUploadField'
import TextAreaFiled from '../../../components/form-controls/TextAreaField'
import { utilsToken } from '../../../utils/token'

function AddNewsModal(props){
    const {isOpen,toggle,onSubmit,handleChange} = props
    const tokenUser = utilsToken.getAccessToken()
    const schema = yup.object().shape({
      //   title:yup.string().required('Tên dự án không được để trống'),
      //   type:yup.string().required('Chọn kiểu dự án'),
      //   city:yup.string(),
      //   district:yup.string(),
      //   price:yup.number(),
      //   acreage:yup.number(),
      //   bedroom_no:yup.number(),
      //   bathroom_no:yup.number(),
     })
     const form = useForm({
        defaultValues: {
            title:'',
            content:'',
            token:tokenUser,
            cover:[],

        },
        resolver: yupResolver(schema),
     })

     const handleSubmit = async values => {
        Modal.confirm({
           title: `Are you sure to do add this project?`,
        //    icon: <ExclamationCircleOutlined />,
           onOk: async () => {
              if (onSubmit) {
                 const response = await onSubmit(values)
                 if (response) {
                    form.reset()
                 }
              }
           },
           onCancel() {
              return
           }
        })
     }
    
    return(
        <FormModal
            title="Add NewsPaper"
            width={900}
            footerTexts={['Cancel', 'Save']}
            isOpen={isOpen}
            toggle={toggle}
            form={form}
            onPrimarySubmit={form.handleSubmit(handleSubmit)}
        >
            <form>
                <Row>
                    <Col span ={18}>
                        <InputField
                            size="large"
                            name="title"
                            form={form}
                            placeholder="Tên dự án"
                            label="Tên dự án"
                            labelCol={{ span: 24 }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col  span={24}>
                            <TextAreaFiled
                                size="large"
                                name="content"
                                form={form}
                                placeholder="Nội dung"
                                label="Nội dung"
                                labelCol={{ span: 24 }}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                            <FileUploadField
                                 name="cover"
                                 form={form}
                                 maxItem={8}
                                 labelCol={{ span: 24 }}
                                 label="Hình ảnh"  
                            />
                    </Col>
                </Row>
            </form>
        </FormModal>
    )
}
export default AddNewsModal