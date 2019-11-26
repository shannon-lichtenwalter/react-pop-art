import React from 'react';
import EventsApiService from '../../services/events-api-service';
import PopArtContext from '../../context/PopArtContext';
import './FilterOptions.css';

class FilterOptions extends React.Component {
  state = {
    error: null,
    message: null,
  }

  static contextType = PopArtContext;

  handleFilterSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: null, message: null });
    const { city, event_type, date } = event.target;
    EventsApiService.getEvents(city.value, event_type.value, date.value)
      .then(events => {
        this.context.setEvents(events);
        if (events.length === 0) {
          this.setState({
            error: 'Sorry, no events found'
          })
        } else {
          this.setState({
            message: `${this.context.events.length} events found...`
          })
        }
      })
      .then(() => {
        city.value = '';
        event_type.value = '';
        date.value = ''
      })
      .catch((e) => this.context.setError(e))
  }

  handleViewAllEvents = () => {
    EventsApiService.getEvents()
      .then(res => {
        this.context.setEvents(res);
        this.setState({
          error: null,
          message: null,
        })
      })
      .catch((e) => this.context.setError(e));
  }

  renderTodaysDate() {
    const todaysDate = new Date();
    const year = todaysDate.getFullYear(); //YYYY
    const month = ("0" + (todaysDate.getMonth() + 1)).slice(-2); //MM
    const day = ("0" + todaysDate.getDate()).slice(-2); //DD
    const minDay = (year + "-" + month + "-" + day); //"YYYY-MM-DD"

    return minDay;
  }

render() {
  return (
    <form className="filterEvents" onSubmit={this.handleFilterSubmit}>
      <fieldset className='filterOptions' name="filterOptions">
        <legend>Filter Event Results</legend>
        <div>
          <label htmlFor="filterLocation">City</label>
          <input type="text" name="city" id="filterLocation" />
        </div>
        <div>
          <label htmlFor="filterEventType">Type of Event</label>
          <select name="event_type" id="filterEventType">
            <option value=''>All</option>
            <option>Music Performance</option>
            <option>Art Show</option>
            <option>Dance Performance</option>
            <option>Book Signing</option>
            <option>Craft Fair</option>
            <option>Poetry Reading</option>
            <option>Fashion Show</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterDate">Date of Event</label>
          <input min={this.renderTodaysDate()}  type="date" name="date" id="filterDate" />
        </div>
        <button onClick={()=>this.handleViewAllEvents()} className='filter-button' type="reset">View All Events</button>
        <button className='filter-button' type="submit">Filter Events</button>

        <div role='alert'>
          {this.state.error && <p className='red'>{this.state.error}</p>}
          {this.state.message && <p>{this.state.message}</p>}
        </div>
      </fieldset>
    </form>
  )
}
}

export default FilterOptions;