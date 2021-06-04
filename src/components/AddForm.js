import React, { useState } from 'react'

const AddForm = ({ createBlog }) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    console.log(title)
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
      <form onSubmit={addBlog}>
        <table>
          <tbody>
            <tr><td>title:</td><td><input type="text" name="Title" value={title} onChange={({target}) => setTitle(target.value)}/></td></tr>
            <tr><td>author:</td><td><input type="text" author="Author" value={author} onChange={({target}) => setAuthor(target.value)}/></td></tr>
            <tr><td>url:</td><td><input type="text" value={url} url="Url" onChange={({target}) => setUrl(target.value)}/></td></tr>
          </tbody>
        </table>
        <button type="submit">create</button>
      </form>
    )
}

export default AddForm
