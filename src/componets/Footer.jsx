import React from 'react';

export function Footer() {
    return (
        <footer> 
            <div className="title-container">
                <small>&copy; Copyright {new Date().getFullYear()}, West Side YMCA</small>
           </div>
        </footer> 
    );
  }
  
  export default Footer;