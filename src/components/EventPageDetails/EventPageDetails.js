import React from 'react';
import PopArtContext from '../../context/PopArtContext';
import moment from 'moment'
// import * as moment from 'moment';
//import EventsApiService from '../../services/events-api-service';
import RequestorsApiService from '../../services/requestors-api-service';
import {Link} from 'react-router-dom';
import './EventPageDetails.css';

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

    if(this.props.event.slots_available < 1 && !alreadyHosting){
      buttonText = 'Event is full';
      disabledStatus = true;
    }
  
    if(this.props.event.archived){
      buttonText = 'Past Event';
      disabledStatus = true;
    }

    return (
      <button className={disabledStatus ? 'disabled-request-button' : 'request-button'}
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
      <h2 className='event-page-details-h2'>{event.name}</h2>
        <img src={!event.img_url ? 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' : event.img_url} alt='event' />
        
        <h3 className='event-page-details-h3'>{moment.utc(event.date).format('LL')} at {moment(event.time, 'HH:mm').format('LT')}</h3>
        <h4 className='event-page-details-h4'>{event.location}, {event.city}, {event.state}</h4>
        <h4 className='event-page-details-slots'>{event.slots_available === 1 ? event.slots_available + ' Artist Slot Available': event.slots_available + ' Artist Slots Available'}</h4>
        <div>{this.renderRequestToBookButton()}</div>
        <h4 className='event-page-details-h4 details'>Event Details</h4>
        <div className='event-page-details-p'>
          <p>Hosted by: {event.username}</p>
          <p>Type of event: {event.event_type}</p>
          <p>Compensation: {event.paid ? 'Paid' : 'Unpaid'} event</p>
          <p>{event.description ? 'Event Description: ' + event.description : ''}</p>
          <p> {event.additional_details ? 'Additional Details: ' + event.additional_details : ''}</p>
        </div>
        <Link to='/home'><button className='go-back-button'>Go Back</button></Link>
      </>
    )
  }
}

export default EventPageDetails;