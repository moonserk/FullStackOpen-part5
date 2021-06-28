import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'


describe('Renders blog content', () => {
  const blog = {
    blog: { title: 'Some title', author: 'Some author', url: 'http://', likes: 1, user: { name: 'gg' } },
    user: { username: 'gg' },
    addLikes: jest.fn(),
    removeHandler: jest.fn()
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog {...blog} />
    )
  })

  test('renders content', () => {
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('Some title')
    expect(div).toHaveTextContent('Some author')


    const toggableContent = component.container.querySelector('.toggableBlog')
    expect(toggableContent).toHaveStyle('display: none')

  })
  test('renders hide blog  content', () => {

    const toggableContent = component.container.querySelector('.toggableBlog')
    expect(toggableContent).toHaveStyle('display: none')
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(toggableContent).toHaveStyle('display: block')
  })

})


test('clicking the button calls event handler once', () => {

  const blog = {
    blog: { title: 'Some title', author: 'Some author', url: 'http://', likes: 1, user: { id: '1', name: 'gg' } },
    user: { id: '1', username: 'gg' },
    addLikes: jest.fn(),
    removeHandler: jest.fn()
  }

  const component = render(
    <Blog {...blog} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(blog.addLikes.mock.calls).toHaveLength(2)
})
