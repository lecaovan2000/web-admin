import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import IconAddCancel from '@/assets/icons/IconAddCancel'

FormModal.propTypes = {
   title: PropTypes.string.isRequired,
   footerTexts: PropTypes.array,
   isOpen: PropTypes.bool.isRequired,
   toggle: PropTypes.func.isRequired,
   onPrimarySubmit: PropTypes.func.isRequired,
   onSecondarySubmit: PropTypes.func,
   form: PropTypes.object.isRequired,
}

function FormModal(props) {
   const {
      title,
      footerTexts,
      isOpen,
      form,
      toggle,
      onPrimarySubmit,
      onSecondarySubmit,
      ...restProps
   } = props
   const loading = form.formState.isSubmitting

   const renderFooter = () => {
      if (!footerTexts || footerTexts.length === 0) {
         return null
      }
      if (onSecondarySubmit) {
         return [
            <Button key="cancel" type="link" onClick={toggle} loading={loading}>
               {footerTexts[0] || 'Cancel'}
            </Button>,
            <Button key="secondarySubmit" onClick={onSecondarySubmit} loading={loading}>
               {footerTexts[1] || 'Secondary Submit'}
            </Button>,
            <Button key="primarySubmit" type="primary" onClick={onPrimarySubmit} loading={loading}>
               {footerTexts[2] || 'Primary Submit'}
            </Button>,
         ]
      }

      return [
         <Button key="cancel" onClick={toggle} loading={loading}>
            {footerTexts[0] || 'Cancel'}
         </Button>,
         <Button key="primarySubmit" type="primary" onClick={onPrimarySubmit} loading={loading}>
            {footerTexts[1] || 'Save'}
         </Button>,
      ]
   }
   return (
      <Modal
         className="form-modal"
         title={<div className="modal-title__text">{title}</div>}
         closeIcon={
            <div className="modal-title__cancel-button">
               <IconAddCancel />
            </div>
         }
         maskClosable={false}
         visible={isOpen}
         onCancel={toggle}
         confirmLoading={loading}
         footer={renderFooter()}
         {...restProps}
         afterClose={() => {
            if (form) {
               form.reset()
            }
         }}
      >
         {props.children}
      </Modal>
   )
}

export default FormModal
