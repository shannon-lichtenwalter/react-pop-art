import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import './RegisterPage.css';
import TokenService from '../../services/token-service';
import UsersApiService from '../../services/users-api-service';
import PopArtContext from '../../context/PopArtContext';

class RegisterPage extends React.Component {
  state = {
    error: null,
    password: '',
    confirmedPassword: ''
  }

  static contextType = PopArtContext;

    componentDidMount() {
      window.scrollTo(0, 0);
  }

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

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password, password2 } = ev.target;
    this.setState({ error: null })
    if (password.value !== password2.value) {
      this.setState({
        error: 'Passwords must match'
      })
      return null;
    }

    AuthApiService.postUser({
      username: username.value,
      password: password.value,
    })
      .then(user => {
        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        })
          .then(res => {
            username.value = '';
            password.value = '';
            password2.value = '';
            this.setState({
              password: '',
              confirmedPassword: ''
            })
            TokenService.saveAuthToken(res.authToken);
            this.handleLoginSuccess();
          })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handlePasswordChange = (event) => {
    this.setState({ error: null })
    this.setState({ password: event.target.value })
  }

  handleSecondPasswordChange = (event) => {
    this.setState({ error: null })
    this.setState({ confirmedPassword: event.target.value })
  }

  lowerCaseTest = () => {
    const regex = /[a-z]/g;
    if ((this.state.password).match(regex)) {
      return true;
    }
  }

  upperCaseTest = () => {
    const regex = /[A-Z]/g;
    if ((this.state.password).match(regex)) {
      return true;
    }
  }

  digitTest = () => {
    const regex = /\d/
    if ((this.state.password).match(regex)) {
      return true;
    }
  }

  specialCharacterTest = () => {
    const regex = /\W|_/g
    if ((this.state.password).match(regex)) {
      return true;
    }
  }


  render() {

    const { error } = this.state;
    return (
      <section className='sign-up-form'>
        <form
          onSubmit={this.handleSubmit}>

          <fieldset className= 'sign-up-fields' name="userName-password">
            <legend>Sign Up for <span className='app-name'>Pop Art</span></legend>
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div className='inputs'>
              <label className='username-label' htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" required />
            </div>
            <div className='inputs'>
              <label className='password-label' htmlFor="password">Password:</label>
              <input value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} type="password" name="password" id="password" required />
            </div>
            <div className='inputs'>
              <label className='password-label' htmlFor="password2">Confirm Password:</label>
              <input value={this.state.confirmedPassword} onChange={(e) => this.handleSecondPasswordChange(e)} type="password" name="password2" id="password2" required />
            </div>
            <div className='password-requirements'>
              <p className={this.state.password.length > 7 && this.state.password.length < 73 ? 'green' : 'grey'}>Password must be longer than 8 and shorter than 73 characters</p>
              <p className={this.lowerCaseTest() ? 'green' : 'grey'}>Password must contain at least 1 lowercase letter</p>
              <p className={this.upperCaseTest() ? 'green' : 'grey'}>Password must contain at least 1 uppercase letter</p>
              <p className={this.digitTest() ? 'green' : 'grey'}>Password must contain at least 1 number</p>
              <p className={this.specialCharacterTest() ? 'green' : 'grey'}>Password must contain at least one special character</p>
              <p className={this.state.password === this.state.confirmedPassword && this.state.password !== '' ? 'green' : 'grey'}>Passwords must match</p>
            </div>
            <button className='register-button' type="submit">Register</button>
            <div className='options-links'>
              <Link to='/login'>Already have an account?</Link>
              <Link to='/home'>Proceed to Pop Art without signing in...</Link>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default RegisterPage;