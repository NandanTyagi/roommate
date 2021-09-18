import { InteractionStatus } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
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

  const [applicationState, setApplicationState] = useState({ menuOpen: false });

  console.log('App state', applicationState);
  return (
    <>
      {/* {inProgress === InteractionStatus.Login && <h1>LADDDDAAAAR!!!!</h1>} */}
      <AuthenticatedTemplate>
        <div className="container-base">
          <Header />
          <Main
          // applicationState={applicationState}
          // setApplicationState={setApplicationState}
          />
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Header
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />
        <div className="login-container">
          <h1>Utloggad</h1>
          <button
            onClick={() => {
              msalInstance.loginPopup(loginRequest);
            }}
          >
            Sign in
          </button>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
