import Notification from './Notification'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={props.message} type={props.messageType} />
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm