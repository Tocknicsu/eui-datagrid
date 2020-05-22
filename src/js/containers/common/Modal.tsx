import React, { FunctionComponent, useState, ReactNode } from 'react'
import {
  EuiButton,
  EuiModal,
  EuiModalHeader,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiLoadingSpinner,
  EuiButtonProps,
} from '@elastic/eui'

type booleanFunction = () => boolean | Promise<boolean>

export interface Props {
  title?: string
  okLabel?: string
  okButton?: boolean
  okButtonProps?: EuiButtonProps
  cancelLabel?: string
  cancelButton?: boolean
  cancelButtonProps?: EuiButtonProps
  setVisible?: Function
  modalStyle?: React.CSSProperties
  children?: ReactNode
}

const Modal: FunctionComponent<Props> = ({
  title = '',
  okLabel = 'Submit',
  okButton = true,
  okButtonProps,
  cancelLabel = 'Cancel',
  cancelButton = true,
  cancelButtonProps,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setVisible = (): void => {},
  modalStyle,
  children,
}: Props) => {
  const onOk = async (): Promise<void> => {
    setVisible(false)
  }

  const onCancel = async (): Promise<void> => {
    setVisible(false)
  }
  return (
    <EuiOverlayMask>
      <EuiModal style={modalStyle} onClose={(): void => setVisible(false)}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{children}</EuiModalBody>

        <EuiModalFooter>
          {cancelButton && (
            <EuiButton onClick={onCancel} {...cancelButtonProps}>
              {cancelLabel}
            </EuiButton>
          )}
          {okButton && (
            <EuiButton onClick={onOk} {...okButtonProps}>
              {okLabel}
            </EuiButton>
          )}
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )
}

export default Modal
