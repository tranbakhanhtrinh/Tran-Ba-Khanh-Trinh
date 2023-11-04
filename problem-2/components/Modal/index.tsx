import Button from '@/components/Button'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type Props = {
  children: React.ReactNode
  modalTitle: string
  showModal: boolean
  setCloseModal: (val: boolean) => void
}

const Modal = ({ children, modalTitle, showModal, setCloseModal }: Props) => {
  return (
    <div
      className={clsx(
        'modal',
        showModal
          ? 'opacity-100 translate-y-2'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <div className='modal--wrapper'>
        <div className='modal--title'>
          <p>{modalTitle}</p>
          <Button
            type='button'
            onClick={() => setCloseModal(false)}
          >
            <Image
              src='/icons/close.svg'
              alt='Close button'
              width={20}
              height={20}
            />
          </Button>
        </div>
        <div className='modal--body'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
