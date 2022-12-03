import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm addBlog={createBlog} />)

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('save')

    await user.type(title, 'blog title')
    await user.type(author, 'blog author')
    await user.type(url, 'www.blog.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.blog.com')
})