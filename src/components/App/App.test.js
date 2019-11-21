import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//import config from '../../config';

describe('App test', () => {

  // beforeEach(() => {
  //   jest.spyOn(window.location, 'assign').mockImplementation(l => {
  //     expect(l).toEqual(config.API_ENDPOINT);
  //   });

  //   window.location.assign.mockClear();
  // });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})