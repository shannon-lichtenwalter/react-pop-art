import React from 'react';
import { Link } from 'react-router-dom';
//import EventsApiService from '../../services/events-api-service';
import FilterOptions from '../FilterOptions/FilterOptions';
import Event from '../Event/Event';
import PopArtContext from '../../context/PopArtContext';

class HomePage extends React.Component {
  state = {
    filteringResults: false,
  }

  static contextType = PopArtContext;

  handleReturnToTop = () => {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.context.clearError();

    this.context.removeFilterFromEvents();
    // window.scrollTo(0, 0);

    // EventsApiService.getEvents()
    //   .then(res => {
    //     this.context.setEvents(res)
    //   })
    //   .catch((e) => this.context.setError(e));
  }
  render() {
    return (
      <div className='homePage'>
        <section>
          <Link to='/create-event'>
            <button>Create New Event</button>
          </Link>
          <button
            onClick={() => this.setState({ filteringResults: !this.state.filteringResults })}
          >Filter Event Results
        </button>
          {this.state.filteringResults && <FilterOptions />}
        </section>

        {this.context.events.map(event => {
          return <Event key={event.id} event={event} />
        })}
        <button onClick={()=>this.handleReturnToTop()}>Return to Top of Page</button>
      </div>
    )
  }
}

export default HomePage;