import React from 'react';
import * as moment from 'moment';
import RequestorsList from '../RequestorsList/RequestorsList'
import './HostedEvents.css';
import EventsApiService from '../../services/events-api-service';
import PopArtContext from '../../context/PopArtContext';

class HostedEvents extends React.Component {
  // state = {
  //   events: this.props.events
  // }
  static contextType = PopArtContext;

  //  deleteHostsEvent = (event_id) => {
  //     const updatedEvents = this.state.events.filter(event => event.id !== event_id);
  //     this.setState({
  //       events: updatedEvents
  //     });
  //   }

  handleCancelEvent = (event_id) => {
    EventsApiService.deleteEvent(event_id)
      .then(res => {
        this.context.deleteEvent(event_id);
        // this.deleteHostsEvent(event_id);
      })
      .catch((e) => this.context.setError(e));
  }

  hostedEvents = () => {
    return this.context.userHostedEvents.map((event, index) => {
      return (
        <div key={index}>
          <li><span className='event-name'>{event.name}</span>
            <div><button className='cancel-event-button' onClick={() => this.handleCancelEvent(event.id)}>Cancel Event?</button></div>
          </li>
          <ul className='hosted-event-details'>
            <li>Date: {moment((event.date).toLocaleString()).format('LL')}</li>
            <li>Time: {moment(event.time, 'HH:mm').format('LT')} </li>
            <li>Available Artist Slots: {event.slots_available}</li>
            <li><span className='booking-requests'>Booking Requests: </span>
              {event.requestors ? <RequestorsList eventId={event.id} slots_available={event.slots_available} requestors={event.requestors} /> : 'none'}
            </li>
          </ul>
        </div>
      )
    })
  }
  render() {
    return (
      <ul className='hosted-events'>
        {this.hostedEvents()}
      </ul>
    )
  }
}

export default HostedEvents;