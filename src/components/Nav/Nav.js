import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import PopArtContext from '../../context/PopArtContext';
import './Nav.css';

class Nav extends React.Component {

  static contextType = PopArtContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.setLoggedIn();
    this.context.clearError();
    this.context.clearUserRequests();
    this.context.clearUserHostedEvents();
    this.context.removeFilterFromEvents();
    this.context.setLoggedInUser(null);
  }

  renderLoggedInLinks = () => {
    return (
      <>
      <li><Link to='/my-account'>My Account</Link></li>
      <li><Link onClick={this.handleLogoutClick} to='/home'>Logout</Link></li>
      </>
    )
  }

  renderLoggedOutLinks = () => {
    return (
      <>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Sign Up</Link></li>
      </>
    )
  }


  render() {
    return (
      <ul className='navigationLinks'>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/'>About</Link></li>
        {TokenService.hasAuthToken()
          ? this.renderLoggedInLinks()
          : this.renderLoggedOutLinks()}
      </ul>
    )
  }
}

export default Nav;