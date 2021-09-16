import React from 'react';
import { msalInstance } from '../MSAL/msalConfigs';

function MenuBtn() {
  let isOpen = false;
  return (
    <div style={{ cursor: "pointer" }} onClick={() => {
      console.log("logout");
      msalInstance.logoutPopup({
        mainWindowRedirectUri: "/"
      })
    }} className="menu-btn">
      {!isOpen ? (
        <i className="fas fa-bars fa-4x" id="menu-btn"></i>
      ) : (
        <i className="fas fa-times fa-4x"></i>
      )}
    </div>
  );
}

export default MenuBtn;
