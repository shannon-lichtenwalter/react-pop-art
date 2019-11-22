import React from 'react';
import PopArtContext from '../../context/PopArtContext';
import * as moment from 'moment';
//import EventsApiService from '../../services/events-api-service';
import RequestorsApiService from '../../services/requestors-api-service';
import {Link} from 'react-router-dom';

class EventPageDetails extends React.Component{
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
    if(alreadyHosting){
      buttonText = 'This is your event';
      disabledStatus = true;
    }
    if(alreadyRequested){
      buttonText = `Request ${alreadyRequested.booking_status}`;
      disabledStatus = true;
    }

    if(this.props.event.slots_available < 1){
      buttonText = 'Event is full';
      disabledStatus = true;
    }
  
    if(this.props.event.archived){
      buttonText = 'Past Event';
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

  handleGoBack = () => {
    this.props.history.push('/home');
  }

  render(){
    const event = this.props.event;
    return(
      <>
      <Link to='/home'><button>Go Back</button></Link>
      <h2>{event.name}</h2>
        <img src={!event.img_url ? 'https://images.unsplash.com/photo-1514575619841-1a3d949d3277?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80' : event.img_url} alt='event' />
        <h3>{moment(event.date).format('LL')} at {moment(event.time, 'HH:mm').format('LT')}</h3>
        <h4>{event.location}, {event.city}, {event.state}</h4>
        <h4>{event.slots_available === 1 ? event.slots_available + ' Artist Slot Available': event.slots_available + ' Artist Slots Available'}</h4>
        {this.renderRequestToBookButton()}
        <h4>Event Details</h4>
        <p>Hosted by: {event.username}</p>
        <p>Type of event: {event.event_type}</p>
        <p>{event.paid ? 'Paid' : 'Unpaid'} event</p>
        <p>{event.description}</p>
        <p> {event.additional_details}</p>
      </>
    )
  }
}

export default EventPageDetails;