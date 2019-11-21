import React from 'react';
import RequestorsApiService from '../../services/requestors-api-service';

class RequestorsList extends React.Component{

  handleApproveRequest = (requestorId) => {
    RequestorsApiService.updateRequest(requestorId, this.props.eventId, 'Accepted')
    .then(res => {
      console.log(res);
    })

  };

  handleDenyRequest = () => {

  }
  
  renderRequestorsList = () => {
    return this.props.requestors.map(requestor => {
      return (
        <li key={requestor.user_id}>{requestor.username} has requested to book this event. Status: {requestor.booking_status}
              <button onClick={()=> this.handleApproveRequest(requestor.user_id)}>Approve</button>
              <button>Deny</button>
        </li>
      )
    })
  }
  
  render(){
    return(
      <ul>
        {this.renderRequestorsList()}
      </ul>
    )
  }
}

export default RequestorsList;