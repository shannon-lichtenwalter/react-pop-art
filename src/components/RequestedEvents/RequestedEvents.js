import React from 'react';
import * as moment from 'moment';

class RequestedEvents extends React.Component{

requestedEvents = () => {
      return this.props.requests.map(request => {
        return (
          <li key={request.event_id}>{request.name} on {moment(request.date).format('LL')} at {moment(request.time, 'HH:mm').format('LT')} :: {request.booking_status} </li>
        )
    });
  }


  render(){  
    return(
      <ul>{this.requestedEvents()}</ul>
    )
  }
}

export default RequestedEvents;