import React from 'react';
import * as moment from 'moment';
import PopArtContext from '../../context/PopArtContext';
import './RequestedEvents.css';

class RequestedEvents extends React.Component{
  static contextType = PopArtContext;

requestedEvents = () => {
      return this.context.userRequests.map((request, index) => {
        return (
          <li key={index}><div className='event-name-header'><span className='event-name'>{request.name}</span></div>
            <ul className='request-details'>
              <li>Date: {moment.utc(request.date).format('LL')}</li>
              <li>Time: {moment(request.time, 'HH:mm').format('LT')} </li>
              <li className= {request.booking_status === 'Pending' ? 'pending-status' : request.booking_status === 'Accepted' ? 'accepted-status' : 'denied-status'} 
              >Status : {request.booking_status}</li>
            </ul> 
          </li>
        )
    });
  }


  render(){  
    return(
      <ul className='requested-events'>{this.requestedEvents()}</ul>
    )
  }
}

export default RequestedEvents;