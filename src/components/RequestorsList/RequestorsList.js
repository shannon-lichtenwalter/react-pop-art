import React from 'react';
import RequestorsApiService from '../../services/requestors-api-service';
import PopArtContext from '../../context/PopArtContext';
import EventsApiService from '../../services/events-api-service';
import './RequestorsList.css';


class RequestorsList extends React.Component {

  static contextType = PopArtContext;

  handleApproveRequest = (requestorId) => {
    RequestorsApiService.updateRequest(requestorId, this.props.eventId, 'Accepted')
      .then(res => {
        this.context.getAllHostedEvents();
      })
      .catch((e) => this.context.setError)
    

      EventsApiService.updateSlotsAvailable(this.props.eventId)
        .then(res => {
          this.context.updateSlotsAvailable(this.props.eventId);
          return null
        })
        .catch((e) => this.context.setError)

  };

  handleDenyRequest = (requestorId) => {
    RequestorsApiService.updateRequest(requestorId, this.props.eventId, 'Denied')
      .then(res => {
        this.context.getAllHostedEvents();
      })
      .catch((e) => this.context.setError)
  }


  renderRequestorsList = () => {
    this.props.requestors.sort((a,b) => a.booking_status > b.booking_status ? 1 : -1);
    return this.props.requestors.map((requestor, index) => {
      return (
        <div key={index}>
        <li className='new-requestor-below'></li>
        <li className='requestor-details'><span className='requestor-username'>{requestor.username}</span>
        </li>
        <ul className='booking-options'>
        <li className= {requestor.booking_status === 'Pending' ? 'pending-status' : requestor.booking_status === 'Accepted' ? 'accepted-status' : 'denied-status'} 
        > Status: {requestor.booking_status} </li>
          {(requestor.booking_status === 'Pending') 
          ?
          <li>
          <button className='accept-button'
          disabled={this.props.slots_available < 1 ? true : false} 
          onClick={() => this.handleApproveRequest(requestor.user_id)}>{this.props.slots_available < 1 ? 'Event Full' : 'Accept'}</button>
          <button className='deny-button' onClick={() => this.handleDenyRequest(requestor.user_id)}>Deny</button>
          </li>
        : ''
      }
        </ul>
        
        </div>
      )
    })
  }

  render() {
    return (
      <ul className='hosted-event-requestors'>
        {this.renderRequestorsList()}
      </ul>
    )
  }
}

export default RequestorsList;