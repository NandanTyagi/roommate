import { InteractionStatus } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Header from './componets/Header';
import Main from './componets/Main';
import MenuModal from './componets/MenuModal';
import Data from './Data';

function App() {
  const data = Data();
  const alarms = data.filter((d) => d.isAlarm === true);
  console.log('The Data in App', data);
  console.log('Alarms', alarms);
  const { inProgress, accounts } = useMsal();
  console.log('Progress', inProgress);

  const [applicationState, setApplicationState] = useState({
    menuOpen: false,
    loggedIn: false,
    showResetBtn: false,
    rooms: data,
    alarms: alarms,
    user: '',
  });

  console.log('ApplicationState', applicationState);
  useEffect(() => {
    setTimeout(() => {
      setApplicationState({ ...applicationState, user: accounts });
      if (accounts.length > 0) {
        setApplicationState({
          ...applicationState,
          loggedIn: true,
          user: accounts[0].username,
        });
        console.log('Accout', accounts[0].username);
      } else {
        setApplicationState({ ...applicationState, loggedIn: false });
      }
    }, 200);
  }, [accounts]);

  return (
    <>
      <AuthenticatedTemplate>
        <div className="container-base">
          <Header
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
          {applicationState.menuOpen ? (
            <div className="login-container">
              {applicationState.menuOpen && applicationState.loggedIn ? (
                <MenuModal
                  applicationState={applicationState}
                  setApplicationState={setApplicationState}
                />
              ) : null}
            </div>
          ) : (
            <div className="login-container z">
              {/* {applicationState.menuOpen && applicationState.loggedIn ? (
                <MenuModal
                  applicationState={applicationState}
                  setApplicationState={setApplicationState}
                />
              ) : null} */}
            </div>
          )}
          <Main
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Header
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />

        <div className="login-container">
          {applicationState.menuOpen && (
            <MenuModal
              applicationState={applicationState}
              setApplicationState={setApplicationState}
            />
          )}
          <h2>Utloggad</h2>
          <br />
          <h3>Tryck på menyn för att logga in!</h3>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
