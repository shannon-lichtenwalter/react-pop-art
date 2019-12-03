import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import RequestorsList from './RequestorsList';

describe('Requestors List component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><RequestorsList requestors={[]}/></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})