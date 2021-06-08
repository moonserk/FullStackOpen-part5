import React from 'react'
import '../style.css'

const Notify = ({ message, type }) => {
  const color = type === 'error' ? 'red' : 'green'

  return (
    <div className='notification' style={{ color: color, borderColor: color }}>
      {message}
    </div>
  )
}

export default Notify
