'use client'
import clsx from 'clsx'
import { useState, useEffect, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
  show: boolean
}

const Portal = ({ children, show }: PortalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal')
    setMounted(show)
  }, [show])

  const jsxContent = (
    <div
      className={clsx(
        'overlay',
        mounted ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {children}
    </div>
  )
  return ref.current ? createPortal(jsxContent, ref.current) : null
}

export default Portal
