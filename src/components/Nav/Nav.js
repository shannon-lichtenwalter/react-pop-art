import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


class Nav extends React.Component{
  render(){
    return(
      <ul className='navigationLinks'>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Sign Up</Link></li>
      </ul>
      
      
    )
  }
}

export default Nav;