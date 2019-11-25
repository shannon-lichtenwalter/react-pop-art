import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import RegisterPage from './RegisterPage';
import {BrowserRouter} from 'react-router-dom';

describe('RegisterPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><RegisterPage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})