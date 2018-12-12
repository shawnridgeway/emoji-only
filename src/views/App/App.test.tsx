// 3p
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import 'jest-styled-components';

// Project
import App from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
