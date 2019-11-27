import React from 'react';
import RequestorsList from '../RequestorsList/RequestorsList';
import * as moment from 'moment';
import EventsApiService from '../../services/events-api-service';
import PopArtContext from '../../context/PopArtContext';

class GenerateRequestorsList extends React.Component {
  state = {
    managingEvent: false
  }

  static contextType = PopArtContext;

  handleCancelEvent = (event_id) => {
    EventsApiService.deleteEvent(event_id)
      .then(res => {
        this.context.deleteEvent(event_id);
        // this.deleteHostsEvent(event_id);
      })
      .catch((e) => this.context.setError(e));
  }

  render() {
    const event=this.props.event;
    return (
      <div className='hostedEventDetails'>
      <li className='event-name'>
        <span>{event.name}</span>
      </li>
        <ul className='hosted-event-details'>
          <li>Date: {moment.utc(event.date).format('LL')}</li>
          <li>Time: {moment(event.time, 'HH:mm').format('LT')} </li>
          <li>Available Artist Slots: {event.slots_available}</li>
          
        </ul>
      
      <li><button className='manage-event-button' onClick={()=> this.setState({managingEvent:!this.state.managingEvent})}>{this.state.managingEvent ? 'Close' :'Manage Requests'}</button></li>
        {/* {this.state.managingEvent && <GenerateRequestorsList managingEvent={this.state.managingEvent} eventId={event.id} slots_available={event.slots_available} requestors={event.requestors}/>} */}
        {this.state.managingEvent && 
          <div className='managing-options'>
          <li><span className='booking-requests'>Booking Requests: </span>
            {event.requestors ? <RequestorsList eventId={event.id} slots_available={event.slots_available} requestors={event.requestors} /> : 'none'}
          </li>
          
          </div>
            }
            <li><button className='cancel-event-button' onClick={() => this.handleCancelEvent(event.id)}>Cancel Event?</button></li>
        </div>
    
    )
  }
}

export default GenerateRequestorsList;