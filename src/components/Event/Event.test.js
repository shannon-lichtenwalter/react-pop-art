import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import Event from './Event';

describe('Event component', () => {
  const testEvent = {
    id:1,
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Event event={testEvent}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})