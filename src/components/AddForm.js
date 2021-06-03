import React from 'react'
import Toggable from './Toggable'

const AddForm = ({handleAdding, title, titleHandler, author, authorHandler, url, urlHandler}) => {
    return (
        <Toggable>
          <form onSubmit={handleAdding}>
            <table>
              <tbody>
                <tr><td>title:</td><td><input type="text" name="Title" value={title} onChange={titleHandler}/></td></tr>
                <tr><td>author:</td><td><input type="text" author="Author" value={author} onChange={authorHandler}/></td></tr>
                <tr><td>url:</td><td><input type="text" value={url} url="Url" onChange={urlHandler}/></td></tr>
              </tbody>
            </table>
            <button type="submit">create</button>
          </form>
        </Toggable>
    )
}

export default AddForm
