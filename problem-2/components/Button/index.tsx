import clsx from 'clsx'
import React, { MouseEventHandler, ReactNode } from 'react'

type Props = {
  type: 'button' | 'submit'
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  children: ReactNode
}
const Button = ({ type, onClick, className, disabled, children }: Props) => {
  return (
    <button
      type={type || 'submit'}
      onClick={onClick}
      className={clsx(className)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
