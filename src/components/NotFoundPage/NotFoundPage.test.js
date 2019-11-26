import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from './NotFoundPage';
import {MemoryRouter} from 'react-router-dom';

describe('NotFoundPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><NotFoundPage /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})