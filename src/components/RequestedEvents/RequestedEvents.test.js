import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import RequestedEvents from './RequestedEvents';
import {BrowserRouter} from 'react-router-dom';

describe.skip('RequestedEvents component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><RequestedEvents /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})