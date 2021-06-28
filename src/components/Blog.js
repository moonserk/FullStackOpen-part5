import React, { useState } from 'react'

const Blog = ({ blog, user, addLikes, removeHandler }) => {

  const [isVisible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => { addLikes(blog) }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!isVisible)}>{isVisible ? 'hide' : 'show'}</button>
      </div>

      <div className='toggableBlog' style={{ display: isVisible ? '' : 'none' }}>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes}<button onClick={handleLikes}>like</button></p>
        <p>{blog.user.name}</p>
        <p>{user.username}{blog.user.username}</p>
        {user.id !== (blog.user.id || blog.user) ? '' :
          <button style={{ backgroundColor: 'blue' }} onClick={() => removeHandler(blog.id)}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
