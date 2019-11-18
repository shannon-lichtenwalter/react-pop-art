import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0);
}
  render(){
    return(
      <section>
          <p>Welcome to Pop Art, the interactive application 
            that allows you to be your own booking agent.</p>
            <p>Pop Art is revolutionizing the booking process for events in your local
              community. Organizers use Pop Art to post about their upcoming event including the type of event and how many 
              artists they are looking to have for the event. For example, a coffee shop may post about their upcoming indie
              music night that still has two slot availabilities for indie musicians or bands to fill. A local event space may post
              about a public art show that they are hosting that they hope to have four additional artists at to display their work. Or
              perhaps there is a local house show happening and they need one more band to hop on the lineup last minute. Pop Art is 
              here to connect event organizers to the talented people that can help make their event a success. Pop Art believes strongly
              in the values of expanding support of local creativity and artistry throughout communities across the country.
            </p>
            <p>Artists on Pop Art can browse event postings and if they find one that sounds like a good fit then they can request to
              fill one of the open slots. Event organizers can view the artist profile where they can checkout portfolios, work samples, or 
              bandcamp links to see if the artist would be a good fit for the event. If so, the venue can proceed to accept the Artist's request.
              Following an event, hosts and artists can leave reviews for one another detailing their event experience. This feature of 
              Pop Art will help to discourage venues from cancelling events at the last minute or for artists to no-show to the events.
            </p>
            <p> Pop Art is also a great tool for advertising your local event. Users are not required
              to make an account unless they are an artist or an event host. Therefore, anyone can download Pop Art and browse 
              event postings to see what events are coming up in their area. Event postings will stay active until the event date
              has passed.
            </p>
            <p>Ready to be part of local pop up art events in your community?</p>
            <Link to='/home'><button>Proceed to Pop Art!</button></Link>
        </section>
    )
  }
}

export default LandingPage;