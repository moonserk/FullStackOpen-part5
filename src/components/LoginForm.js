import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, usernameHandler, password, passwordHandler }) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={usernameHandler} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={passwordHandler} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordHandler: PropTypes.func.isRequired
}

export default LoginForm
