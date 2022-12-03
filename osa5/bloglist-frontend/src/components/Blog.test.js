import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'www.blog.com'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} removeBlog={mockHandler} updateBlog={mockHandler} />)

  const element = screen.getByPlaceholderText('sort version')
  expect(element).toHaveTextContent('blog title, blog author')
})

test('clicking the title opens details', async () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'www.blog.com',
    likes: 0
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} removeBlog={mockHandler} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByPlaceholderText('sort version')
  await user.click(button)

  const element = screen.getByPlaceholderText('long version')
  expect(element).toHaveTextContent('www.blog.com')
  expect(element).toHaveTextContent('likes 0')
  expect(element).toHaveTextContent('blog author')
})