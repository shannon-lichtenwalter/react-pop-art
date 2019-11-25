import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import EventPage from './EventPage';

describe('EventPage component', () => {
  const defaultProps = {
    match: { params: { eventId: 1 } },
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventPage {...defaultProps}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})