import React, { useImperativeHandle, useState } from 'react'

const Toggable = React.forwardRef((props, ref) => {
  const [isVisible, setVisible] = useState(false)
  const hideWhenVisible = { display : isVisible ? 'none' : '' }
  const showWhenVisible = { display : isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel || 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'
export default Toggable
