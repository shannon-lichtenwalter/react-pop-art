import React from 'react';
import ReactDOM from 'react-dom';
import GenerateHostedEventInfo from './GenerateHostedEventInfo';



describe('CreateEventPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GenerateHostedEventInfo event={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})