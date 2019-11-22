import React from 'react';
import PopArtContext from '../../context/PopArtContext';
//import * as moment from 'moment';
import EventsApiService from '../../services/events-api-service';
//import RequestorsApiService from '../../services/requestors-api-service';
import EventPageDetails from '../EventPageDetails/EventPageDetails';

class EventPage extends React.Component {
  state = {
    event: null
  }

  static contextType = PopArtContext;

  componentDidMount = () => {
    EventsApiService.getCurrentEvent(this.props.match.params.eventId)
      .then(res => {
        this.setState({
          event: res
        })
      })
        .catch((e) => this.context.setError(e));
      
  };


  render() {

    const event = this.state.event ? this.state.event[0] : null

    return (
    <>
      <section>
        {event && this.context.currentUser && <EventPageDetails event={this.state.event[0]}/>}
      
      
      
      </section>
    </>
    )
  }
}

export default EventPage;