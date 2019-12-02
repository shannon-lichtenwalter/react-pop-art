import React from 'react';
import './HostedEvents.css';
import PopArtContext from '../../context/PopArtContext';
import GenerateHostedEventInfo from '../GenerateHostedEventInfo/GenerateHostedEventInfo';

class HostedEvents extends React.Component {
  state = {
    managingEvent: false,
  }
  static contextType = PopArtContext;

  //the following function will sort this.context.userHostedEvents 
  // by date because when the user creates a new event and then navigates
  // to their account page, the list should remain sorted in order by date.

  hostedEvents = () => {
    const sortedUserHostedEvents = this.context.userHostedEvents.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
    return sortedUserHostedEvents.map((event, index) => {
      return (
        <GenerateHostedEventInfo key={index} event={event}/>
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