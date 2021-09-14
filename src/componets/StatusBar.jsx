import React, { useState, useContext } from 'react';
import ActButton from './ActButton';
import Data from '../Data';

function StatusBar() {
  const isAlarm = false;
  return (
    <>
      {isAlarm ? (
        <div className="status-container">
          <h2 className="status">
            Status: <span id="status">Inga larm!</span>
          </h2>
          <div className="act-btn nodisplay" id="act-btn">
            Åtgärda
          </div>
        </div>
      ) : (
        <div className="status-container">
          <h2 className="status alert">
            Status: <span id="status">1 aktivt larm!</span>
          </h2>
          <ActButton />
        </div>
      )}
    </>
  );
}

export default StatusBar;
