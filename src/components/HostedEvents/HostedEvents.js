import React from 'react';
import * as moment from 'moment';
import RequestorsList from '../RequestorsList/RequestorsList'

class HostedEvents extends React.Component{
  hostedEvents = () => {
    return this.props.events.map(event => {
      return(
        <li key={event.id}>{event.name} on {moment((event.date).toIso).format('LL')} at {moment(event.time, 'HH:mm').format('LT')}
        <button>Cancel Event</button>
        Requesting to Book Event: {event.requestors ? <RequestorsList eventId ={event.id} requestors={event.requestors}/> : 'none'}
        <ul>

        </ul>
      </li>
      )
    })
  }
  render(){
    return(
      <ul>
        {this.hostedEvents()}
      </ul>
    )
  }
}

export default HostedEvents;