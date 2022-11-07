import React, {useImperativeHandle, useRef, useState, forwardRef} from 'react'
import { Modal } from 'antd'
import 'antd/es/modal/style/css'
import './style.scss'

const ModalComponents = ({children,  ...props}, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  useImperativeHandle(ref, () => ({
    openModal: () => {
      setIsOpen(true)
    },
    closeModal: () => {
      setIsOpen(false)
    }
  }))

  return (
      <Modal
          open={isOpen}
          onCancel = {()=>{setIsOpen(false)}}
          centered
          footer={null}
          {...props}
      >
        {children}
      </Modal>
  )
}
export default forwardRef(ModalComponents)
