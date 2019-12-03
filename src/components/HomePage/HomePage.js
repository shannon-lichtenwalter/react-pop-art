import React from 'react';
import { Link } from 'react-router-dom';
import FilterOptions from '../FilterOptions/FilterOptions';
import Event from '../Event/Event';
import PopArtContext from '../../context/PopArtContext';
import './HomePage.css';

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
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div className='homePage'>
        <section className='filterSection'>
          <Link to='/create-event'>
            <button 
              className='homepage-buttons'>
                Create New Event
            </button>
          </Link>
          <button 
            className='homepage-buttons'
            onClick={() => this.setState({ filteringResults: !this.state.filteringResults })}>
              Filter Event Results
          </button>
          {this.state.filteringResults && <FilterOptions />}
        </section>
        <section className='allEventsSection'>
          {this.context.events.map(event => {
            return <Event key={event.id} event={event} />
          })}
        </section>
        <button 
          className='return-to-top-button' 
          onClick={()=>this.handleReturnToTop()}>
            Return to Top of Page
        </button>
      </div>
    )
  }
}

export default HomePage;