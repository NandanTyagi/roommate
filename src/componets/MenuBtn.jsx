import React from 'react';

function MenuBtn() {
  let isOpen = false;
  return (
    <div className="menu-btn">
      {!isOpen ? (
        <i className="fas fa-bars fa-4x" id="menu-btn"></i>
      ) : (
        <i className="fas fa-times fa-4x"></i>
      )}
    </div>
  );
}

export default MenuBtn;
