import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    blog: { title: 'Some title', author: 'Some author', user: { name: 'gg' } },
    user: { username: 'gg' },
    addLike: () => {},
    removeHandler: () => {}
  }

  const component = render(<Blog {...blog} />)

  expect(component.container).toHaveTextContent('Some title')
  expect(component.container).toHaveTextContent('Some author')
})
