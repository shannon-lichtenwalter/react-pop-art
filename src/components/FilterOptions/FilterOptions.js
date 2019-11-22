import React from 'react';
import EventsApiService from '../../services/events-api-service';
import PopArtContext from '../../context/PopArtContext';

class FilterOptions extends React.Component {
  state = {
    error: null,
  }

  static contextType = PopArtContext;

  handleFilterSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: null });
    const { city, event_type, date } = event.target;
    EventsApiService.getEvents(city.value, event_type.value, date.value)
      .then(events => {
        this.context.setEvents(events);
        if(events.length === 0) {
          this.setState({
            error:'Sorry, no events found'
          })
        }
      })
      .then(() => {
        city.value = '';
        event_type.value = '';
        date.value=''
      })
      .catch((e) => this.context.setError(e))
  }
  render() {
    return (
      <form className="filterEvents" onSubmit={this.handleFilterSubmit}>
        <fieldset name="filterOptions">
          <legend>Filter Event Results</legend>
          <div>
            <label htmlFor="filterLocation">City</label>
            <input placeholder="example: Denver, CO" type="text" name="city" id="filterLocation" />
          </div>
          <div>
            <label htmlFor="filterEventType">Type of Event</label>
            <select name="event_type" id="filterEventType">
              <option value =''>All</option>
              <option>Music Performance</option>
              <option>Art Show</option>
              <option>Dance Performance</option>
              <option>Book Signing</option>
              <option>Craft Fair</option>
              <option>Poetry Reading</option>
              <option>Fashion Show</option>
              <option>Other</option>
            </select>
            <div>
              <label htmlFor="filterDate">Date of Event</label>
              <input placeholder="MM/DD/YYYY" type="date" name="date" id="filterDate" />
            </div>
          </div>
          <button type="submit">Filter Events</button>
          <div role='alert'>
                {this.state.error && <p className='red'>{this.state.error}</p>}
              </div>
        </fieldset>
      </form>
    )
  }
}

export default FilterOptions;