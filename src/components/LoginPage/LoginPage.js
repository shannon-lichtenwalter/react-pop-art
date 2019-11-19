import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';

class LoginPage extends React.Component {
  state = {
    error: null
  }

  handleLoginSuccess = () => {
    this.props.history.push('/home')
  }

  handleSubmitJwtAuth = event => {
    event.preventDefault();
    this.setState({ error: null })
    const { username, password } = event.target;

    console.log(username.value, password.value);

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { error } = this.state;
    return (
      <section>
        <form
          className="sign-in-form"
          onSubmit={this.handleSubmitJwtAuth}>
          <fieldset name="userName-password">
            <legend>Log in to Pop Art</legend>
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" required />
            </div>
            <button type="submit">Login</button>
            <div>
              <Link to='/register'>Create An Account?</Link>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default LoginPage;