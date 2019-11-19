import React from 'react';

class FilterOptions extends React.Component {
  render() {
    return(
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
    )
  }
}

export default FilterOptions;