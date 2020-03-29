import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import './App.css';
import Content from './components/Content';
import Navbar from './components/navbar/Navbar';

library.add(faSquare, faCheckSquare);

function App() {
  return (
    <>
      <Navbar />
      <Content />
    </>
  );
}

export default App;
