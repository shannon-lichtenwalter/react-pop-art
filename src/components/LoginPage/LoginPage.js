import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0);
}
  render(){
    return(
      <section>
      <form className="sign-in-form" action="#" method="post">
        <fieldset name="userName-password">
          <legend>Log in to Pop Art</legend>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" required/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" id="password" required/>
          </div>
          <button type="submit">Log In</button>
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