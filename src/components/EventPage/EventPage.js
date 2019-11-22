import React from 'react';
import PopArtContext from '../../context/PopArtContext';
import * as moment from 'moment';

class EventPage extends React.Component{
  state = {
    events: []
  }
  static contextType = PopArtContext;

  componentDidMount(){
    this.setState({
      events:this.context.events
    })
  }
  
  render(){
    console.log(this.props.match.params.eventId);
    const event = this.state.events.filter(event => event.id === this.props.match.params.eventId);
    console.log(event);
    return(
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

export default EventPage;