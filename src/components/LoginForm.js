import React from 'react'

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

export default LoginForm
