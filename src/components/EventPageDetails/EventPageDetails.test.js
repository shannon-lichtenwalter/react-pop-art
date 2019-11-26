import React from 'react';
import ReactDOM from 'react-dom';
import EventPageDetails from './EventPageDetails';
import { MemoryRouter } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';



describe('CreateEventPage component', () => {
  it('renders without crashing', () => {
    const testEvent = { name: 'test', id: 1 };
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><PopArtContext.Provider value={{ userRequests: [{ event_id: 1 }], currentUser: { user_id: 1 } }}><EventPageDetails event={testEvent} /></PopArtContext.Provider></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})