import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'www.blog.com'
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByPlaceholderText('sort version')
  expect(element).toHaveTextContent('blog title, blog author')
})