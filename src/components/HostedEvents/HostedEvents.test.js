import React from 'react';
import ReactDOM from 'react-dom';
import HostedEvents from './HostedEvents';
import { MemoryRouter } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';

describe('HostedEvents component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><PopArtContext.Provider value={{userHostedEvents:[]}}><HostedEvents/></PopArtContext.Provider></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})