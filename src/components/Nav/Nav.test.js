import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import {MemoryRouter} from 'react-router-dom';

describe('Nav component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Nav /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})