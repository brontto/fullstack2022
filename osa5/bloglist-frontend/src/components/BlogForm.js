const BlogForm = (props) => (
    <form onSubmit={props.addBlog}>
      <div>
        title:
        <input
          value={props.newBlogTitle}
          onChange={({ target }) => props.setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={props.newBlogAuthor}
          onChange={({ target }) => props.setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={props.newBlogUrl}
          onChange={({ target }) => props.setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )

export default BlogForm