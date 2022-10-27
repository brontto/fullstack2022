import { useState } from 'react'

const Blog = ({ blog }) => {
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


  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        <div onClick={() => setShowDetails(true)} style={{cursor: 'pointer'}}>{blog.title}, {blog.author}</div>
      </div>
      <div style={showWhenVisible}>
        {blog.title}, {blog.author}
        <button onClick={() => setShowDetails(false)}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
      </div>
    </div>
  )
}
export default Blog