import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import EventPageDetails from './EventPageDetails';
import TestContext from '../../context/TestContext';
import Enzyme, { mount } from 'enzyme';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.skip('EventPageDetails component', () => {
  
  it('renders without crashing', () => {
    const context = {
    userRequests: [{event_id:1}]
  };
  const testEvent = {name:'test', id:1};
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
    <TestContext.Provider 
      value={{
      context
    }}>
      <EventPageDetails event={testEvent}/>
      </TestContext.Provider>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})


// describe('CreateEventPage component', () => {
//   const testEvent = {
//     name: 'test'
//   };


//   it('renders without crashing', () => {
//     const context = { userRequests: [{event_id:1}] };
//     const wrapper = shallow(<EventPageDetails event={testEvent}/>, {context})
//     const div = document.createElement('div');
//     ReactDOM.render(wrapper.setContext({context}), div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// })