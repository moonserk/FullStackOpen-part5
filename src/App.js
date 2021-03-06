import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddForm from './components/AddForm'
import Notify from './components/Notify'
import Toggable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState('green')
  const addFormRef = useRef()

  useEffect(() => {
    async function fetchData(){
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    console.log(loggedUserJSON)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`Welcome back ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(e){
      setErrorMessage('Wrong username or password')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
        setTypeMessage('')
      }, 5000)
    }
  }

  const loginFrom = () => (
    <div>
      <h2>Log in to application</h2>
      <LoginForm handleLogin={handleLogin}
        username={username}
        usernameHandler={({ target }) => setUsername(target.value)}
        password={password}
        passwordHandler={({ target }) => setPassword(target.value)}/>
    </div>
  )

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {

    try {
      addFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(e){
      setErrorMessage('Somthing goes wrong')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
        setTypeMessage('')
      }, 5000)
    }

  }

  const addLikes = async (blogObject) => {
    try{
      await blogService.addLikes(blogObject.id, blogObject)
      // console.log(blogObject)
      const newBlogs = blogs.map(blog => blog.id !== blogObject.id ? blog : { ...blog, likes: blog.likes + 1 })
      // console.log(newBlogs)
      setBlogs(newBlogs)
      // console.log(blogs)
      // setErrorMessage(`${returnedObject.title} by ${returnedObject.author} likes added`)
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }catch(e){
      setErrorMessage('Somthing goes wrong')
      setTypeMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
        setTypeMessage('')
      }, 5000)
    }
  }

  const removeHandler = async (id) => {
    const removedBlog = blogs.filter(blog => blog.id === id)[0]
    console.log(removedBlog)
    if(window.confirm(`Remove blog ${removedBlog.title} by ${removedBlog.author}`)){
      try{
        const deletedBlog = await blogService.remove(id)
        console.log(deletedBlog)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }catch(e){
        setErrorMessage('Wrong credentials')
        setTypeMessage('error')
        setTimeout(() => {
          setErrorMessage(null)
          setTypeMessage('')
        }, 5000)
      }
    }
  }

  const blogsList = () => (
    <div>
      <p>{user.name} logged-in
        <button onClick={logoutHandler}>logout</button>
      </p>
      <Toggable buttonLabel="create new blog" ref={addFormRef}>
        <AddForm createBlog={addBlog} />
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addLikes={addLikes} removeHandler={removeHandler}/>
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      { errorMessage !== null ? <Notify message={errorMessage} type={typeMessage} /> : null}
      {user === null ? loginFrom() : blogsList() }

    </div>
  )
}

export default App
