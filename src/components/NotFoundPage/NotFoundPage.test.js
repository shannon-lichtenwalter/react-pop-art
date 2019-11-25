import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import NotFoundPage from './NotFoundPage';
import {BrowserRouter} from 'react-router-dom';

describe('NotFoundPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NotFoundPage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})