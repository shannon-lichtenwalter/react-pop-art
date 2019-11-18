import React from 'react';

class CreateEventPage extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0);
}
  render(){
    return(
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
        <form className="create-event-form" action="#" method="post">
          <fieldset name="userName-password">
            <legend>Submit Event Details</legend>
            <div>
              <label htmlFor="eventName">Event Name:</label>
              <input type="text" name="eventName" id="eventName" required />
            </div>
            <div>
              <label htmlFor="venueName">Venue Name:</label>
              <input type="text" name="venueName" id="venueName" required />
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
              <input placeholder="MM/DD/YYYY" type="number" name="date" id="date" required />
            </div>
            <div>
              <label htmlFor="time">Time:</label>
              <input placeholder="example: 6:00pm" type="text" name="time" id="time" required />
            </div>
            <label htmlFor="eventType">Type of Event</label>
            <select name="eventType" id="eventType" required>
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
              <textarea name="description" id="description" required></textarea>
            </div>
            <div>
              <label htmlFor="slotsAvailable">Artist Slots Available</label>
              <input type="number" name="slotsAvailable" id="slotsAvailable" required />
            </div>
            <div>
              <label htmlFor="paidEvent">Are you offerring to pay the artist(s) for this event?</label>
              <select name="paidEvent" id="paidEvent" required>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label htmlFor="details">Additional Details</label>
              <textarea placeholder="arrival time, equipment available, contact info" name="details" id="details"
                required></textarea>
            </div>
            <div>
                <label htmlFor="eventPhoto">Upload photo for event?</label>
                <input type="url" name="eventPhoto" id="eventPhoto" />
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