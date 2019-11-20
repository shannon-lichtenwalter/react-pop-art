import React from 'react';
import EventsApiService from '../../services/events-api-service';
import PopArtContext from '../../context/PopArtContext';

class CreateEventPage extends React.Component {
  state = {
    error: null
  }

  static contextType = PopArtContext;

  handleSubmitNewEvent = event => {
    event.preventDefault();
    this.setState({error: null})
    const {name, date, time, location, city, state, slots_available, event_type, paid, description, additional_details, img_url } = event.target;
    const newEvent = {
      name: name.value,
      date: date.value,
      time: time.value,
      location: location.value,
      city: city.value,
      state: state.value,
      slots_available: slots_available.value,
      event_type: event_type.value,
      paid: paid.value,
      description: description.value,
      additional_details: additional_details.value,
      img_url: img_url.value
    }

    EventsApiService.postEvent(newEvent)
      .then(res => {
          this.context.addEvent(res);
          this.props.history.push('/home')
        })
      .then(()=> {
      name.value= ''
      date.value = ''
      time.value= ''
      location.value= ''
      city.value = ''
      state.value= ''
      slots_available.value= ''
      event_type.value= ''
      paid.value= ''
      description.value= ''
      additional_details.value= ''
      img_url.value= ''
      })
      .catch((e) => this.context.setError(e))
    
  }

  renderTodaysDate(){
    const todaysDate = new Date();
    const year = todaysDate.getFullYear(); //YYYY
    const month = ("0" + (todaysDate.getMonth() +1)).slice(-2); //MM
    const day = ("0" + todaysDate.getDate()).slice(-2); //DD
    const minDay = (year +"-"+ month +"-"+day); //"YYYY-MM-DD"

    return minDay;
  }
  // componentDidMount() {
  //   window.scrollTo(0, 0);
  // }
  render() {
    const { error } = this.state;
    return (
      <div>
        <section>
          <h2>Before you post...</h2>
          <p>Before creating an event, please note that it is your responsibility
            as the event host to make sure that your event is safe for your event guests.
            It is the event host's responsibility to be sure that the event site and facilities
            are appropriate for the event type. Pop Art is not responsible for the outcome of any events.
        </p>
          <p>
            Also, if you must cancel your event, it is your responsibility to contact the booked artists by e-mail
            to notify them of the event cancellation. Pop Art is not responsible for arranging any transactions or
            payments between any artist and host.
        </p>
        </section>
        <section>
          <h2> Create an Event</h2>
          <form className="create-event-form" onSubmit={this.handleSubmitNewEvent}>
            <fieldset name="userName-password">
              <legend>Submit Event Details</legend>
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div>
                <label htmlFor="eventName">Event Name:</label>
                <input type="text" name="name" id="eventName" required />
              </div>
              <div>
                <label htmlFor="venueName">Venue Name:</label>
                <input type="text" name="location" id="venueName" required />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" required />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input type="text" name="state" id="state" required />
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <input placeholder="MM/DD/YYYY" type="date" min={this.renderTodaysDate()} name="date" id="date" required />
              </div>
              <div>
                <label htmlFor="time">Time:</label>
                <input placeholder="example: 6:00pm" type="time" name="time" id="time" required />
              </div>
              <label htmlFor="eventType">Type of Event</label>
              <select name="event_type" id="eventType">
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
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description"></textarea>
              </div>
              <div>
                <label htmlFor="slotsAvailable">Artist Slots Available</label>
                <input type="number" min="0" name="slots_available" id="slotsAvailable" required />
              </div>
              <div>
                <label htmlFor="paidEvent">Are you offerring to pay the artist(s) for this event?</label>
                <select name="paid" id="paidEvent">
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>
              <div>
                <label htmlFor="details">Additional Details</label>
                <textarea placeholder="arrival time, equipment available, contact info" name="additional_details" id="details"
                  ></textarea>
              </div>
              <div>
                <label htmlFor="eventPhoto">Upload photo for event?</label>
                <input type="url" name="img_url" id="eventPhoto" />
              </div>
              <button type="submit">Post Event</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default CreateEventPage;