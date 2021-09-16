import { InteractionStatus } from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './componets/Header';
import Main from './componets/Main';
import Data from './Data';
import { loginRequest, msalInstance } from './MSAL/msalConfigs';

function App() {

  const data = Data();
  console.log('The Data in App', data);
  const { inProgress } = useMsal();

  return (
    <>
      {/* {inProgress === InteractionStatus.Login && <h1>LADDDDAAAAR!!!!</h1>} */}
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
