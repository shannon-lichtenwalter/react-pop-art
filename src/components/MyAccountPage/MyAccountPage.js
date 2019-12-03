import React from 'react';
import { Link } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';
import RequestedEvents from '../RequestedEvents/RequestedEvents';
import HostedEvents from '../HostedEvents/HostedEvents';
import UsersApiService from '../../services/users-api-service';
import TokenService from '../../services/token-service';
import './MyAccountPage.css';

class MyAccountPage extends React.Component {
  state = {
    user: this.context.currentUser,
    requests: this.context.userRequests,
    events: [],
    deletingAccount: false
  };

  static contextType = PopArtContext;

  componentDidMount() {
    this.context.clearError();
  }

  handleDeleteClicked = () => {
    this.setState({
      deletingAccount:true
    })
  }

  handleCancelDelete = () => {
    this.setState({
      deletingAccount:false
    })
  }

  deleteAccount = () => {
    UsersApiService.deleteAccount()
      .then(() => {
        TokenService.clearAuthToken();
        this.context.setLoggedIn();
        this.context.clearError();
        this.context.clearUserRequests();
        this.context.clearUserHostedEvents();
        this.context.removeFilterFromEvents();
        this.context.setLoggedInUser(null);
      })
      .catch((e) => this.context.setError)
  }

renderDeleteConfirmation = () => {
  return (
    <>
      <p>Warning, by deleting your account you will also be deleting all of your posted events and all of your event requests.</p>
      <h4 className='final-confirm-delete'>Are You Sure You Want to Delete?</h4>
      <button className='my-account-page-buttons' onClick ={()=> this.deleteAccount()}>yes, delete my account now</button>
      <button className='my-account-page-buttons' onClick={()=> this.handleCancelDelete()}>no, I changed my mind</button>
    </>
  )
}

  render() {
    const user = this.context.currentUser;
    
    return (
      <div className='my-account-page-section'>
        <section>
          <h2 className='welcome-header'> Welcome back{user ? ', ' + user.username : ''} </h2>
        </section>
        <section className='booking-requests-section'>
          <h2 className='booking-requests-header'>My Booking Requests</h2>
          {this.context.userRequests ? <RequestedEvents /> : ''}
        </section>
        <section>
          <h2 className='hosted-events-header'>My Hosted Events</h2>
          <Link to='/create-event'>
            <button className='my-account-page-buttons'>Create New Event</button>
          </Link>
          {this.context.userHostedEvents ? <HostedEvents /> : ''}
        </section>
        <section className='account-options'>
          <h2>Account Options</h2>
          <button className='my-account-page-buttons' onClick={()=> this.handleDeleteClicked()}>Delete Account</button>
          {this.state.deletingAccount && this.renderDeleteConfirmation()}
        </section>
      </div>
    )
  }
}

export default MyAccountPage;