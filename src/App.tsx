import React, { useState, useContext } from 'react';
import './App.css';
import Header from './componets/Header';
import Main from './componets/Main';
import Data from './Data';

function App() {

  const data = Data();
  console.log('The Data in App', data);

  return (
    <div className="container-base">
      <Header />
      <Main />
    </div>
  );
}

export default App;
