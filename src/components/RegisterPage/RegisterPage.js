import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';

class RegisterPage extends React.Component {
  state = {
    error: null,
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
              <input placeholder="must contain one number" type="password" name="password" id="password" required />
            </div>
            <div>
              <label htmlFor="password2">Confirm Password:</label>
              <input placeholder="must contain one number" type="password" name="password2" id="password2" required />
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