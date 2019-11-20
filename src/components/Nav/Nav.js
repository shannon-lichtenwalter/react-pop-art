import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import TokenService from '../../services/token-service';
import PopArtContext from '../../context/PopArtContext';

class Nav extends React.Component {

  static contextType = PopArtContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.setLoggedIn();
    this.context.setLoggedInUser(null);
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