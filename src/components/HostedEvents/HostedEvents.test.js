import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import HostedEvents from './HostedEvents';

describe.skip('HostedEvents component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HostedEvents/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})