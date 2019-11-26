import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  window.scrollTo = jest.fn();
})

describe('Login Page component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><LoginPage /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})