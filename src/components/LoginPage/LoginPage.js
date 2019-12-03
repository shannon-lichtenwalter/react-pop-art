import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import PopArtContext from '../../context/PopArtContext';
import UsersApiService from '../../services/users-api-service';
import './LoginPage.css';

class LoginPage extends React.Component {
  state = {
    error: null
  }

  static contextType = PopArtContext;

  handleLoginSuccess = () => {
    this.context.setLoggedIn();
    this.context.setUserRequests();
    this.context.getAllHostedEvents();
    UsersApiService.getLoggedInUser()
      .then(res => {
        this.context.setLoggedInUser(res)
      })
      .catch((e) => this.context.setError(e));
    this.props.history.push('/home');
  }

  handleSubmitJwtAuth = event => {
    event.preventDefault();
    this.setState({ error: null })
    const { username, password } = event.target;

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

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }
  
  render() {
    const { error } = this.state;
    return (
      <section className='login-form'>
        <form className="sign-in-form" onSubmit={this.handleSubmitJwtAuth}>
          <fieldset className='login-fields' name="userName-password">
            <legend>
              Login to <span className='app-name'>Pop Art</span>
            </legend>
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div>
              <label className='username-label' htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" required />
            </div>
            <div>
              <label className='password-label' htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" required />
            </div>
            <button className='login-button' type="submit">Login</button>
            <div className='register-link'>
              <Link to='/register'>Create An Account?</Link>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default LoginPage;