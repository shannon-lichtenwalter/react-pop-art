import React from 'react';
import './Event.css';
import moment from 'moment';
import PopArtContext from '../../context/PopArtContext';
import { Link } from 'react-router-dom';

class Event extends React.Component {
  state = {
    expand: false,
  }

  static contextType = PopArtContext;

  render() {
    const event = this.props.event;
    const eventPage = `/event/${event.id}`

    return (
      <section id='event-section' className={event.id}>

        <h2>{event.name}</h2>
        <img src={!event.img_url ? 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' : event.img_url} alt='event' />
        <h3>{moment.utc(event.date).format('LL')} at {moment(event.time, 'HH:mm').format('LT')}</h3>
        <h4>{event.location}, {event.city}, {event.state}</h4>
        {this.context.loggedIn && <Link to={eventPage}><button className='view-event-details-button'>View Event Details</button></Link>}
      </section>
    )
  }
}

export default Event;