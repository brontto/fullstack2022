import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlogHandler = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addBlogHandler}>
      <div>
        title:
        <input
          id='title'
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
        author:
        <input
          id='author'
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
        url:
        <input
          id='url'
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          placeholder='url'
        />
      </div>
      <button id='create-button' type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm