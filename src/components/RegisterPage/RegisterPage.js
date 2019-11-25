import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import './RegisterPage.css';

class RegisterPage extends React.Component {
  state = {
    error: null,
    password: '',
    confirmedPassword: ''
  }

  //   componentDidMount() {
  //     window.scrollTo(0, 0);
  // }

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
        username.value = '';
        password.value = '';
        password2.value = '';
        this.props.history.push('/login')
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleSecondPasswordChange = (event) => {
    this.setState({confirmedPassword: event.target.value})
  }

  lowerCaseTest = () => {
    const regex = /[a-z]/g;
    if((this.state.password).match(regex)){
      return true;
    }
    }

    upperCaseTest = () => {
      const regex = /[A-Z]/g;
      if((this.state.password).match(regex)){
        return true;
      }
      }

      digitTest = () => {
        const regex = /\d/
        if((this.state.password).match(regex)){
          return true;
        }
        }
        
    specialCharacterTest = () => {
      const regex = /\W|_/g
        if((this.state.password).match(regex)){
          return true;
        }
    }


  render() {

    const { error } = this.state;
    return (
      <section>
        <form
          className="sign-up-form"
          onSubmit={this.handleSubmit}>

          <fieldset name="userName-password">
            <legend>Sign Up for Pop Art</legend>
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input placeholder="example: johnIsCool2001" type="text" name="username" id="username" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} type="password" name="password" id="password" required />
            </div>
            <div>
              <label htmlFor="password2">Confirm Password:</label>
              <input value={this.state.confirmedPassword} onChange={(e) => this.handleSecondPasswordChange(e)} placeholder="must contain one number" type="password" name="password2" id="password2" required />
            </div>
            <div>
              <p className={this.state.password.length > 7 && this.state.password.length < 73 ? 'green' : 'red'}>Password must be longer than 8 characters and shorter than 73 characters</p>
              <p className={this.lowerCaseTest() ? 'green' : 'red'}>Password must contain at least 1 lowercase letter</p>
              <p className={this.upperCaseTest() ? 'green' : 'red'}>Password must contain at least 1 uppercase letter</p>
              <p className={this.digitTest() ? 'green' : 'red'}>Password must contain at least 1 number</p>
              <p className={this.specialCharacterTest() ? 'green' : 'red'}>Password must contain at least one special character</p>
              <p className={this.state.password === this.state.confirmedPassword && this.state.password !== '' ? 'green' : 'red'}>Passwords must match</p>
            </div>
            <button type="submit">Register</button>
            <div>
              <Link to='/login'>Already have an account?</Link>
              <Link to='/home'>Proceed to Pop Art without signing in</Link>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default RegisterPage;