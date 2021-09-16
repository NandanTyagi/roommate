import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import React, { useState, useContext } from 'react';
import './App.css';
import Header from './componets/Header';
import Main from './componets/Main';
import Data from './Data';
import { loginRequest, msalInstance } from './MSAL/msalConfigs';

function App() {

  const data = Data();
  console.log('The Data in App', data);

  return (

    <>
      <AuthenticatedTemplate>
        <div className="container-base">
          <Header />
          <Main />
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>Utloggad</h1>
        <button onClick={() => { msalInstance.loginPopup(loginRequest) }}>Sign in</button>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
