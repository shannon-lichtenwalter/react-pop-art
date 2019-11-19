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
import PopArtContext from '../../context/PopArtContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';

class App extends React.Component {
  state = {
    error: null,
  }

  setError = (err) => {
    this.setState({
      error: err.error
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0);
}
  render() {
    return (
      <PopArtContext.Provider value={{
        error: this.state.error,
        setError: this.setError,
      }} >
        <div className='App'>
          <nav>
            <Nav />
          </nav>
          <main className='App'>
            <header>
            <h1>Pop Art</h1>
            </header>
            {this.state.error && <p className='red'>There was an error! Oh no!</p>}
            <ErrorBoundary>
            <Switch>
              <Route exact path ='/' component= {LandingPage}/>
              <Route path='/home' component={HomePage} />
              <PublicOnlyRoute path= '/login' component={LoginPage}/>
              <PublicOnlyRoute path='/register' component={RegisterPage}/>
              <PrivateRoute path='/create-event' component={CreateEventPage}/>
              <Route component={NotFoundPage}/>
            </Switch>
            </ErrorBoundary>
          </main>
          <footer>
            <p> to return to landing page click <Link to='/'>Here</Link></p>
          </footer>
        </div>
      </PopArtContext.Provider>
    );
  }
}

export default App;
