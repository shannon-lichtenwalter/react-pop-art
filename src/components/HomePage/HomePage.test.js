import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import PopArtContext from '../../context/PopArtContext';

beforeAll(() => {
  window.scrollTo = jest.fn();
})

describe('HomePage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><PopArtContext.Provider value={{events:[], clearError:jest.fn(), removeFilterFromEvents:jest.fn()}}><HomePage /></PopArtContext.Provider></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})