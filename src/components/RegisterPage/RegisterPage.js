import React from 'react';
import { Link } from 'react-router-dom';


class RegisterPage extends React.Component{
//   componentDidMount() {
//     window.scrollTo(0, 0);
// }
  render(){
    return(
      <section>
      <form className="sign-up-form" action="#" method="post">
          <fieldset name="userName-password">
            <legend>Sign Up for Pop Art</legend>
            <div>
                <label htmlFor="e-mail">E-mail:</label>
                <input placeholder="name@gmail.com" type="email" name="e-mail" id="e-mail" required/>
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input placeholder="example: johnIsCool2001" type="text" name="username" id="username" required/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input placeholder= "must contain one number" type="text" name="password" id="password" required/>
            </div>
            <div>
                <label htmlFor="password2">Confirm Password:</label>
                <input placeholder= "must contain one number" type="text" name="password2" id="password2" required/>
              </div>
            <button type="submit">Log In</button>
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