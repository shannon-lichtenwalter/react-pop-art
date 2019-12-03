import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import RegisterPage from './RegisterPage';


beforeAll(() => {
  window.scrollTo = jest.fn();
})

describe('RegisterPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><RegisterPage /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})