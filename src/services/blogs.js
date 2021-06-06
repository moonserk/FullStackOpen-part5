import axios from 'axios'

let token = null

const baseUrl = '/api/blogs'

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const configToken = token => (
  {
    headers: { Authorization: token }
  }
)

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data.sort((a, b) => b.likes - a.likes)
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, configToken(token))
  return response.data
}

const addLikes = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, configToken(token))
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, configToken(token))
  return response.data
}

export default { getAll, create, remove, setToken, addLikes }
