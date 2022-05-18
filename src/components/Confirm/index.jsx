import { Popconfirm } from 'antd'
import React, { Fragment, PureComponent } from 'react'

export default class Confirm extends PureComponent {
   renderTitle = (title, message) => <Fragment>
      {title &&
         <div className='title'>
            {title}
         </div>}
      {message &&
         <div className='message'>
            {message}
         </div>}
   </Fragment>

   render() {
      const { className, title, message, cancelText, okText, onCancel, onConfirm, placement } = this.props
      return (
         <Popconfirm
            className={className || ''}
            icon={null}
            cancelText={cancelText || 'Cancel'}
            okText={okText || 'Confirm'}
            title={() => this.renderTitle(title, message)}
            onCancel={onCancel}
            onConfirm={onConfirm}
            cancelButtonProps={{
               size: 'middle',
               className: 'cancel-button',
            }}
            okButtonProps={{
               size: 'middle',
               className: 'confirm-button',
            }}
            placement={placement || "topRight"}
         >
            {this.props.children}
         </Popconfirm>
      )
   }
}