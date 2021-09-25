import React, { useState } from 'react';
function ActButton({ applicationState, setApplicationState }) {
  const handelClick = () => {
    applicationState.showResetBtn
      ? setApplicationState({
          ...applicationState,
          showResetBtn: false,
        })
      : setApplicationState({
          ...applicationState,
          showResetBtn: true,
        });
  };
  return (
    <>
      {!applicationState.showResetBtn ? (
        <div className="act-btn" id="act-btn" onClick={() => handelClick()}>
          Åtgärda
        </div>
      ) : (
        <div className="act-btn" id="act-btn" onClick={() => handelClick()}>
          Tillbaka
        </div>
      )}
    </>
  );
}

export default ActButton;
