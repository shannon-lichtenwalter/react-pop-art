import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateEventPage from '../CreateEventPage/CreateEventPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './App.css';


class App extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
}
  render() {
    return (
      <div className='App'>
        <nav>
          <Nav />
        </nav>
        <main className='App'>
          <header>
          <h1>Pop Art</h1>
          </header>
          <Switch>
            <Route exact path ='/' component= {LandingPage}/>
            <Route path='/home' component={HomePage} />
            <Route path= '/login' component={LoginPage}/>
            <Route path='/register' component={RegisterPage}/>
            <Route path='/create-event' component={CreateEventPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </main>
        <footer>
          <p> to return to landing page click <Link to='/'>Here</Link></p>
        </footer>
      </div>
    );
  }
}

export default App;
