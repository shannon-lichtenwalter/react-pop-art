import React from 'react';

class RequestorsList extends React.Component{
  
  renderRequestorsList = () => {
    return this.props.requestors.map(requestor => {
      return (
        <li key={requestor.user_id}>{requestor.username} has requested to book this event. Status: {requestor.booking_status}
              <button>Approve</button>
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