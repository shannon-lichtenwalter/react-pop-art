import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import RequestorsList from './RequestorsList';
import {BrowserRouter} from 'react-router-dom';

describe('Requestors List component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><RequestorsList requestors={[]}/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})