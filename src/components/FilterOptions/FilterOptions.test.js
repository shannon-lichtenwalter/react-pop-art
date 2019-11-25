import React from 'react';
import ReactDOM from 'react-dom';
//import renderer from 'react-test-renderer';
import FilterOptions from './FilterOptions';

describe('FilterOptions component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FilterOptions/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})