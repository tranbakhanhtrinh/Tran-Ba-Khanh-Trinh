import React from 'react'

const Tooltip = ({ show }: { show: boolean }) => {
  return (
    <div
      className={`tooltip ${
        show ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      Please use the number keyboard only.
    </div>
  )
}

export default Tooltip
