import React from 'react';
import EventsApiService from '../../services/events-api-service';
import PopArtContext from '../../context/PopArtContext';
import './CreateEventPage.css';

class CreateEventPage extends React.Component {
  state = {
    error: null
  }

  static contextType = PopArtContext;

  handleSubmitNewEvent = event => {
    event.preventDefault();
    this.setState({ error: null });
    const { name, date, time, location, city, state, slots_available, event_type, paid, description, additional_details, img_url } = event.target;
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
      .then(() => {
        name.value = ''
        date.value = ''
        time.value = ''
        location.value = ''
        city.value = ''
        state.value = ''
        slots_available.value = ''
        event_type.value = ''
        paid.value = ''
        description.value = ''
        additional_details.value = ''
        img_url.value = ''
      })
      .catch((e) => this.context.setError(e))
  }

  renderTodaysDate() {
    const todaysDate = new Date();
    const year = todaysDate.getFullYear(); //YYYY
    const month = ("0" + (todaysDate.getMonth() + 1)).slice(-2); //MM
    const day = ("0" + todaysDate.getDate()).slice(-2); //DD
    const minDay = (year + "-" + month + "-" + day); //"YYYY-MM-DD"
    return minDay;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { error } = this.state;
    return (
      <div>

        <section className='before-create-event'>
          <h2>Before you post...</h2>
          <p>Before creating an event, please note that it is your responsibility
            as the event host to make sure that your event is safe for your event guests and artists.
            It is the event host's responsibility to ensure that the event site and facilities
            are appropriate for the event type. Pop Art is not responsible for the outcome of any events. 
            Pop Art is not responsible for arranging payments between hosts and artists.
          </p>
        </section>

        <section className='create-event-form-section'>
          <h2> Create an Event</h2>
          <form className="create-event-form" onSubmit={this.handleSubmitNewEvent}>
            <fieldset name="userName-password" className='create-event-fields'>
              <legend className='create-event-legend'>
                Submit Event Details
              </legend>
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div>
                <label className='create-event-label' htmlFor="eventName">Event Name<span className='required-field'>*</span></label>
                <input className='create-event-input' maxLength='20' type="text" name="name" id="eventName" required />
              </div>
              <div>
                <label className='create-event-label' htmlFor="venueName">Venue Name<span className='required-field'>*</span></label>
                <input className='create-event-input' type="text" name="location" id="venueName" required />
              </div>
              <div>
                <label className='create-event-label' htmlFor="city">City<span className='required-field'>*</span></label>
                <input className='create-event-input' type="text" name="city" id="city" required />
              </div>
              <div>
                <label className='create-event-label' htmlFor="state">State<span className='required-field'>*</span></label>
                <select className='create-event-input' name="state" id="state" required>
                  <option value=''></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div>
                <label className='create-event-label' htmlFor="date">Date<span className='required-field'>*</span></label>
                <input className='create-event-input' type="date" min={this.renderTodaysDate()} name="date" id="date" required />
              </div>
              <div>
                <label className='create-event-label' htmlFor="time">Time<span className='required-field'>*</span></label>
                <input className='create-event-input' placeholder="example: 6:00pm" type="time" name="time" id="time" required />
              </div>
              <div>
                <label className='create-event-label' htmlFor="eventType">Type of Event</label>
                <select className='create-event-input' name="event_type" id="eventType">
                  <option value='Other'></option>
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
                <label className='create-event-label' htmlFor="description">Description</label>
                <textarea className='create-event-input' rows='1' name="description" id="description"></textarea>
              </div>
              <div>
                <label className='create-event-label' htmlFor="slotsAvailable">Artist Slots Available<span className='required-field'>*</span></label>
                <input className='create-event-input' type="number" min="0" name="slots_available" id="slotsAvailable" required />
              </div>
              <div>
                <label className='create-event-label' htmlFor="paidEvent">Are you offerring to pay the artist(s) for this event?</label>
                <select className='create-event-input' name="paid" id="paidEvent">
                  <option value='false'></option>
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>
              <div>
                <label className='create-event-label' htmlFor="details">Additional Details</label>
                <textarea className='create-event-input' rows='1' name="additional_details" id="details"></textarea>
              </div>
              <div>
                <label className='create-event-label' htmlFor="eventPhoto">Choose Icon</label>
                <select className='create-event-input' name="img_url" id="eventPhoto">
                  <option value=''></option>
                  <option value=''>Nonspecific Default Icon</option>
                  <option value='https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'>
                    Instruments Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1481886756534-97af88ccb438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'>
                    Band Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1545518514-ce8448f542b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80'>
                    Art Show Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'>
                    Paintbrushes Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1474308371634-c715850e8d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'>
                    Dance Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1529590003495-b2646e2718bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=820&q=80'>
                    Books Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'>
                    Crafts Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1473186505569-9c61870c11f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'>
                    Poetry Icon
                  </option>
                  <option value='https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'>
                    Fashion Design Icon
                  </option>
                </select>
              </div>
              <div className='submit-create-event-form'>
                <p className='required-field-p'> 
                  <span className='required-field'>*</span>required-field
                </p>
                <button className='create-event-button' type="submit">Post Event</button>
              </div>
            </fieldset>
          </form>
        </section>

      </div>
    )
  }
}

export default CreateEventPage;