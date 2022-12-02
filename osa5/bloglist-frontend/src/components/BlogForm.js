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
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm