import React from 'react';
import moment from 'moment';
import PopArtContext from '../../context/PopArtContext';
import './RequestedEvents.css';

class RequestedEvents extends React.Component{
  static contextType = PopArtContext;

  requestedEvents = () => {
    return this.context.userRequests.map((request, index) => {
      return (
        <div key={index}>
          <li>
            <div className='event-name-header'>
              <span className='event-name'>{request.name}</span>
            </div>
          </li>
          <ul className='request-details'>
            <li>
              Date: {moment.utc(request.date).format('LL')}
            </li>
            <li>
              Time: {moment(request.time, 'HH:mm').format('LT')} 
            </li>
            <li 
              className= {request.booking_status === 'Pending' 
              ? 'pending-status' 
              : request.booking_status === 'Accepted' 
              ? 'accepted-status' 
              : 'denied-status'}>
                Status : {request.booking_status}
            </li>
          </ul> 
        </div>
      )
    });
  }


  render(){  
    return(
      <ul className='requested-events'>
        {this.requestedEvents()}
      </ul>
    )
  }
}

export default RequestedEvents;