import React from 'react';
import ReactDOM from 'react-dom';
import MyAccountPage from './MyAccountPage';
import { MemoryRouter } from 'react-router-dom';
import PopArtContext from '../../context/PopArtContext';

describe('MyAccountPage component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><PopArtContext.Provider value={{clearError:jest.fn()}}><MyAccountPage /></PopArtContext.Provider></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})