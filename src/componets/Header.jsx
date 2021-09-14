import React, { useState, useContext } from 'react';
import MenuBtn from './MenuBtn';
import StatusBar from './StatusBar';

function Header() {
  return (
    <header>
      <div className="title-container">
        <div className="logo-container">
          <img className="logo" src="./ymcalogo.png" alt="YMCA Logo" />
        </div>
        <div className="title">
          <h1>RoomMate</h1>
        </div>
        <MenuBtn />
      </div>
      <StatusBar />
    </header>
  );
}

export default Header;
