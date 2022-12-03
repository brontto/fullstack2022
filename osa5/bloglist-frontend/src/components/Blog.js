import { useState } from 'react'
import PropType from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 300
  }

  const [showDetails, setShowDetails] = useState(false)

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const addLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    updateBlog(blog.id, blogObject)
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        <div onClick={() => setShowDetails(true)} style={{ cursor: 'pointer' }} placeholder='sort version'>{blog.title}, {blog.author}</div>
      </div>
      <div style={showWhenVisible} placeholder='long version'>
        {blog.title}, {blog.author}
        <button onClick={() => setShowDetails(false)}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropType.func.isRequired,
  removeBlog: PropType.func.isRequired
}
export default Blog