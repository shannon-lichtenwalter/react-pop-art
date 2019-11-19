import React from 'react';
//import Moment from 'react-moment';
import './Event.css';




class Event extends React.Component{
  render(){
    const event = this.props.event;

  //   function convert(input) {
  //     return Moment(input, 'HH:mm:ss').format('h:mm:ss A');
  // }

  // console.log(convert(event.time));
    
    return(
      <section>
      <h2>{event.name}</h2>
      <img src= {event.img_url === null ? 'https://images.unsplash.com/photo-1514575619841-1a3d949d3277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80' : event.img_url} alt='event' />
      <h3>{new Date(event.date).toDateString()} at {event.time}</h3>
      <h4>{event.location}, {event.city}, {event.state}</h4>
      <h4>{event.slots_available} Artist Slots Available</h4>
      <button>Request To Book this Event</button>
      <h4>Event Details</h4>
      <p>Hosted by: {event.username}</p>
      <p>Type of event: {event.event_type}</p>
      <p>{event.paid ? 'Paid' : 'Unpaid'} event</p>
      <p>{event.description}</p>
      <p> {event.additional_details}
      </p>
    </section>
    )
  }
}

export default Event;