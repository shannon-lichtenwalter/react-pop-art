import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import TokenService from '../../services/token-service';


class Nav extends React.Component {

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink = () => {
    return (
      <li><Link onClick={this.handleLogoutClick} to='/home'>Logout</Link></li>
    )
  }

  renderLoginLink = () => {
    return (
      <>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Sign Up</Link></li>
      </>
    )
  }

  componentDidMount = () => {
    this.setState(
      { loggedIn: TokenService.hasAuthToken() ? true : false }
    )
  }


  render() {
    return (
      <ul className='navigationLinks'>
        <li><Link to='/home'>Home</Link></li>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </ul>


    )
  }
}

export default Nav;