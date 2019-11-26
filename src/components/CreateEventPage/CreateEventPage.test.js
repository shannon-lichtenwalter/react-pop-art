import React from 'react';
import ReactDOM from 'react-dom';
import CreateEventPage from './CreateEventPage';

beforeAll(() => {
  window.scrollTo = jest.fn();
})

describe('CreateEventPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateEventPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})