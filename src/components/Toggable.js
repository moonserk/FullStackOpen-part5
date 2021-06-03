import React, { useState } from 'react'

const Toggable = (props) => {
    const [isVisible, setVisible] = useState(false)
    const hideWhenVisible = { display : isVisible ? 'none' : '' }
    const showWhenVisible = { display : isVisible ? '' : 'none' }

    return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setVisible(true)}>create new blog</button>
          </div>
          <div style={showWhenVisible}>
            {props.children}
            <button onClick={() => setVisible(false)}>cancel</button>
          </div>
        </div>
    )
}

export default Toggable
