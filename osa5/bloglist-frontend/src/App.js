import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }

  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setMessage(`a blog ${returnedBlog.title} by ${returnedBlog.author} updated`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        })
      })
  }

  const removeBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage('a blog removed')
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          })
        })
    }
  }

  const loginPage = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      message={message}
      messageType={messageType}
    />
  )

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>

      <h2>create new</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
        )}
    </div>
  )


  return (
    <div>
      {user === null ? loginPage() : blogPage()}
    </div>
  )
}

export default App
