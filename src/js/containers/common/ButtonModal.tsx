import React, {
  FunctionComponent,
  useState,
  Fragment,
  ReactElement,
} from 'react'
import { EuiButton, EuiButtonProps } from '@elastic/eui'
import Modal, { Props as ModalProps } from './Modal'

export interface Props extends ModalProps {
  button?: ReactElement
  buttonLabel?: string
  buttonProps?: EuiButtonProps
}

const ButtonModal: FunctionComponent<Props> = ({
  button,
  buttonLabel,
  buttonProps,
  children,
  ...otherProps
}: Props) => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <EuiButton {...buttonProps} onClick={(): void => setVisible(true)}>
        {buttonLabel}
      </EuiButton>
      {visible ? (
        <Modal setVisible={setVisible} {...otherProps}>
          {children}
        </Modal>
      ) : null}
    </Fragment>
  )
}

export default ButtonModal
