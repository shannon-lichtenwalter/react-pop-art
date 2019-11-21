import React from 'react';
import './Event.css';
import * as moment from 'moment';
import PopArtContext from '../../context/PopArtContext';
import RequestorsApiService from '../../services/requestors-api-service';


class Event extends React.Component {
  state = {
    expand: false,
  }

  static contextType = PopArtContext;

  handleRequestEvent = () => {
    const event_id = this.props.event.id;
    RequestorsApiService.addNewRequest(event_id)
      .then((res) => {
        this.context.setUserRequests();
        return null;
      })
      .catch((e) => this.context.setError)
  }

  renderRequestToBookButton = () => {
    let buttonText= 'Request To Book this Event';
    let disabledStatus= false;
    const alreadyRequested = this.context.userRequests.find(request => request.event_id === this.props.event.id );
    const alreadyHosting = this.context.currentUser.user_id === this.props.event.host_id;
    console.log(alreadyRequested);
    if(alreadyHosting){
      buttonText = 'This is your event';
      disabledStatus = true;
    }
    if(alreadyRequested){
      buttonText = `Request ${alreadyRequested.booking_status}`;
      disabledStatus = true;
    }

    return (
      <button 
      disabled={disabledStatus}
      onClick={() => this.handleRequestEvent()}>
        {buttonText}
      </button> 
    )
  }
  


  renderEventDetails = () => {
    return (
      <>
        <h4>{this.props.event.slots_available} Artist Slots Available</h4>
        {this.renderRequestToBookButton()}
        {/* <button
          disabled=
          {this.context.currentUser.user_id === this.props.event.host_id 
            ? true 
            : false
          || this.context.userRequests.find(request => request.event_id === this.props.event.id )
            ? true
            : false}
          onClick={() => this.handleRequestEvent()}
        >Request To Book this Event</button> */}
        <h4>Event Details</h4>
        <p>Hosted by: {this.props.event.username}</p>
        <p>Type of event: {this.props.event.event_type}</p>
        <p>{this.props.event.paid ? 'Paid' : 'Unpaid'} event</p>
        <p>{this.props.event.description}</p>
        <p> {this.props.event.additional_details}
        </p>
      </>
    )
  }

  renderExpandButton = () => {
    return (
      <button onClick={() => this.setState({
        expand: !this.state.expand
      })}>
        {this.state.expand ? 'Show Less' : 'Show More'}
      </button>
    )
  }

  render() {
    const event = this.props.event;

    return (
      <section className={event.id}>

        <h2>{event.name}</h2>
        <img src={!event.img_url ? 'https://images.unsplash.com/photo-1514575619841-1a3d949d3277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80' : event.img_url} alt='event' />
        <h3>{moment(event.date).format('LL')} at {moment(event.time, 'HH:mm').format('LT')}</h3>
        <h4>{event.location}, {event.city}, {event.state}</h4>
        {this.context.loggedIn && this.state.expand && this.renderEventDetails()}
        {this.context.loggedIn && this.renderExpandButton()}
      </section>
    )
  }
}

export default Event;