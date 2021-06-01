import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    }catch(e){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginFrom = () => (
    <div>
      <h2>Log in to application</h2>
       <LoginForm handleLogin={handleLogin}
                 username={username}
                 usernameHandler={({target}) => setUsername(target.value)}
                 password={password}
                 passwordHandler={({target}) => setPassword(target.value)}/>
    </div>
  )

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const blogsList = () => (
    <div>
    <p>{user.name} logged-in
      <button onClick={logoutHandler}>logout</button>
    </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>

      {user === null ? loginFrom() : blogsList() }

    </div>
  )
}

export default App
