import React from 'react';
import RequestorsApiService from '../../services/requestors-api-service';
import PopArtContext from '../../context/PopArtContext';
import EventsApiService from '../../services/events-api-service';

class RequestorsList extends React.Component {

  static contextType = PopArtContext;

  handleApproveRequest = (requestorId) => {
    RequestorsApiService.updateRequest(requestorId, this.props.eventId, 'Accepted')
      .then(res => {
        this.props.getAllHostedEvents();
      })
      .catch((e) => this.context.setError)
    

      EventsApiService.updateSlotsAvailable(this.props.eventId)
        .then(res => {
          return null
        })
        .catch((e) => this.context.setError)

  };

  handleDenyRequest = (requestorId) => {
    RequestorsApiService.updateRequest(requestorId, this.props.eventId, 'Denied')
      .then(res => {
        this.props.getAllHostedEvents();
      })
      .catch((e) => this.context.setError)
  }


  renderRequestorsList = () => {
    this.props.requestors.sort((a,b) => a.booking_status > b.booking_status ? 1 : -1);
    //this.props.requestors.sort()
    return this.props.requestors.map(requestor => {
      return (
        <li key={requestor.user_id}>{requestor.username} has requested to book this event. Status: {requestor.booking_status}
          {(requestor.booking_status === 'Pending') 
          ?
          <>
          <button
          disabled={this.props.slots_available < 1 ? true : false} 
          onClick={() => this.handleApproveRequest(requestor.user_id)}>{this.props.slots_available < 1 ? 'Event Full' : 'Approve'}</button>
          <button onClick={() => this.handleDenyRequest(requestor.user_id)}>Deny</button>
          </>
        : ''
      }
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        {this.renderRequestorsList()}
      </ul>
    )
  }
}

export default RequestorsList;