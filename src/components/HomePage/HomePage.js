import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0);
}
  render(){
    return(
      <div className='homePage'>
      <section>
        <Link to='/create-event'><button>Create New Event</button></Link>
        <form className="filterEvents" action="#" method="post">
            <fieldset name="filterOptions">
              <legend>Filter Event Results</legend>
              <div>
                <label htmlFor="filterLocation">City, State</label>
                <input placeholder= "example: Denver, CO" type="text" name="filterLocation" id="filterLocation"/>
              </div>
              <div>
                <label htmlFor="filterEventType">Type of Event</label>
                <select name="filterEventType" id="filterEventType">
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
                    <input placeholder= "MM/DD/YYYY" type="text" name="filterDate" id="filterDate"/>
                  </div>
              </div>
              <button type="submit">Filter Events</button>
            </fieldset>
          </form>
    </section>

    <section>
      <h2>Folk Music Night</h2>
      <h3>November 20th, 2019 at 7pm</h3>
      <h4>Peak Place Coffee Shop, Colorado Springs, CO</h4>
      <h4>3 Artist Slots Available</h4>
      <button>Request To Book this Event</button>
      <h4>Event Details</h4>
      <p>Hosted by: Jane</p>
      <p>Type of event: Music Performance</p>
      <p>Unpaid event</p>
      <p>Looking to book three more artists for an evening of Folk music at Peak Place.
        We have a microphone and small PA system for you to use. Each artist set will be approx
        30 minutes long. Please contact me at jane@gmail.com
      </p>
      <p> Please arrive by 6pm for set up. We have a small area 
        where you can display your merch if you would like. We repeat this 
        event once a month and are looking for regulars to play this event.
        Free coffee on us.
      </p>
    </section>

    <section>
        <h2>House Show</h2>
        <h3>November 29th, 2019 at 8pm</h3>
        <h4>DM for address, Colorado Springs, CO</h4>
        <h4>1 Artist Slot Available</h4>
        <button>Request To Book this Event</button>
        <h4>Event Details</h4>
        <p>Hosted by: Haley</p>
        <p>Type of event: Music Performance</p>
        <p>Unpaid event</p>
        <p>We had a band drop out and are looking for a hardcore band to play our house show.
          It is XYZ's album release show and AAA and BBB will be playing as well. 
        </p>
        <p> Load in is at 7. We do not have any sound system, so bring your own gear.
        </p>
    </section>

    <section>
        <h2>Book Signing</h2>
        <h3>December 1st, 2019 at 10am</h3>
        <h4>Barnes and Noble, Colorado Springs, CO</h4>
        <h4>1 Artist Slot Available</h4>
        <button>Request To Book this Event</button>
        <h4>Event Details</h4>
        <p>Hosted by: Barnes and Noble</p>
        <p>Type of event: Book Signing</p>
        <p>Unpaid event</p>
        <p> Once a month we host a local author spotlight. We are looking for one 
          local author to read an excerpt of their novel and stay around for a book
          signing or to answer questions afterwards.
        </p>
        <p> Please arrive at 9:45 am for set up. We will supply a table and chairs.
        </p>
    </section>

    <section>
        <h2>Mixed Media Art Show</h2>
        <h3>December 12th, 2019 at 3pm</h3>
        <h4>Welcome Fellow, Colorado Springs, CO</h4>
        <h4>4 Artist Slots Available</h4>
        <button>Request To Book this Event</button>
        <h4>Event Details</h4>
        <p>Hosted by: Jeff</p>
        <p>Type of event: Art Show</p>
        <p>Unpaid event</p>
        <p> We are hosting a small art show that will be open to the public on December 12th.
          We are looking for any local artists that would like to display some of their works
          at the show. You would have wall space for hanging pieces (approx 4ft by 4ft) and could also
          have a small table space for setup as well. e-mail jeff@gmail.com for more details.
        </p>
        <p> We will have a set-up day on December 11th to make sure everyone has the appropriate space 
          and tools to set up their art pieces.
        </p>
    </section>
    </div>
    )
  }
}

export default HomePage;