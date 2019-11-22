import React from 'react';
import * as moment from 'moment';
import RequestorsList from '../RequestorsList/RequestorsList'
import './HostedEvents.css';

class HostedEvents extends React.Component{
  hostedEvents = () => {
    return this.props.events.map(event => {
      return(
        <li key={event.id}>{event.name} on {moment((event.date).toLocaleString()).format('LL')} at {moment(event.time, 'HH:mm').format('LT')}
        <div>Artist Slots Available: {event.slots_available}</div>
        <div><button>Cancel Event</button></div>
        Requesting to Book Event: {event.requestors ? <RequestorsList eventId ={event.id} slots_available={event.slots_available} requestors={event.requestors} getAllHostedEvents={this.props.getAllHostedEvents}/> : 'none'}
        <ul>

        </ul>
      </li>
      )
    })
  }
  render(){
    return(
      <ul className='event'>
        {this.hostedEvents()}
      </ul>
    )
  }
}

export default HostedEvents;