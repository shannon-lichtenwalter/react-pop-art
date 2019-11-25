import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import MyAccountPage from './MyAccountPage';
import {BrowserRouter} from 'react-router-dom';

describe.skip('MyAccountPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MyAccountPage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})