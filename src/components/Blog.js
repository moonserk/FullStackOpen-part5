import React, {useState} from 'react'

const Blog = ({blog, addLikes}) => {

  const [isVisible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = e => {
    addLikes(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!isVisible)}>{isVisible ? 'hide' : 'show'}</button>
      </div>

      <div style={{display: isVisible ? '' : 'none'}}>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes}<button onClick={handleLikes}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
