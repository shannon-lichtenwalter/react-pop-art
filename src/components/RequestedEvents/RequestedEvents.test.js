import React from 'react';
import ReactDOM from 'react-dom';
import RequestedEvents from './RequestedEvents';
import { MemoryRouter } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';

describe('RequestedEvents component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><PopArtContext.Provider value={{userRequests:[]}}><RequestedEvents /></PopArtContext.Provider></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})