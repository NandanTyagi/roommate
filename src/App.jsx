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
import {
  createConnection,
  getNegotiationUrl,
  updateStateFromSignalRTelemetry,
} from './Smarthut/signalR';
import { smartHutAction } from './Smarthut/Smarthut';
import { createApiDataFromGetBuildingAndDevicesData } from './Utils/DataModelMapper';

function App() {
  // const data = Data();

  // console.log('The Data in App', data);
  // console.log('Alarms', alarms);
  const { inProgress, accounts } = useMsal();
  // console.log('Progress', inProgress);

  const [getBuildingAndDevicesFetching, setGetBuildingAndDevicesFetching] =
    useState(false);

  const [applicationState, setApplicationState] = useState({
    menuOpen: false,
    loggedIn: false,
    showResetBtn: false,
    rooms: [],
    alarms: null,
    user: '',
    units: null,
  });

  const [signalRConnection, setSignalRConnection] = useState(null);

  useEffect(() => {
    console.log('current state', applicationState.rooms);

    if (applicationState.rooms != null) {
      console.log('recalculate alarms');
      const alarms = applicationState.rooms.filter((d) => d.isAlarm === true);
      setApplicationState((prev) => ({ ...prev, alarms: alarms }));
    }
  }, [applicationState.rooms]);

  // console.log('ApplicationState', applicationState);
  useEffect(() => {
    setTimeout(() => {
      setApplicationState({ ...applicationState, user: accounts });
      if (accounts.length > 0) {
        setApplicationState({
          ...applicationState,
          loggedIn: true,
          user: accounts[0].username,
        });
        // console.log('Accout', accounts[0].username);
      } else {
        setApplicationState({ ...applicationState, loggedIn: false });
      }
    }, 200);
  }, [accounts]);

  //Här hämtas API-datan med hjälp av funktionen SmartHutActions. Denna data modelleras om med hjälp av createApiDataFromGetBuildingAndDevicesData så
  // att vi får modeller som är anpassade efter hur vi ska rendera appen. You'll find thje def of this type as "type ApiDataObject" in types.ts.

  useEffect(() => {
    //if no login progress in course.
    if (inProgress === 'none') {
      //Checks if user is logged in
      if (accounts.length > 0) {
        //Here we get all the units data so that we can find out what units the values have.
        if (!applicationState.units) {
          smartHutAction('getUnits').then((res) => {
            if (res != null) {
              const unitsData = res.data;
              // console.log("unit data", unitsData);
            }
          });
        }

        //this action takes an ID which is hard coded here, because we are only making the application for one Hotel, right?
        //However the smartHutAction-function could be called in two steps (first getBuilding to get the id and then getBuildoingDevices...
        if (
          applicationState.rooms.length < 1 &&
          !getBuildingAndDevicesFetching
        ) {
          console.log('get building devices going!!!');
          setGetBuildingAndDevicesFetching(true);
          smartHutAction('getBuildingAndDevices', {
            id: '55350997-9be4-4746-b94d-3b9fad7ea795',
          }).then((res) => {
            if (res != null) {
              const buildingAndDevicesData = res.data;

              //Gives us an object that is defined as "type ApiDataObject" in types.ts.
              const data = createApiDataFromGetBuildingAndDevicesData(
                buildingAndDevicesData,
              );

              // console.log("data object created", data);

              setApplicationState((prev) => ({ ...prev, rooms: data }));
              setGetBuildingAndDevicesFetching(false);
            } else {
              console.log('error - no data in from getBuildingData');
            }
          });
        }
      }
    }
  }, [inProgress, applicationState.rooms, accounts, applicationState.units]);

  //In this useeffect all signalR configs are made. negotiation => connection => listening to events
  useEffect(() => {
    if (inProgress === 'none') {
      //Checks if user is logged in
      if (accounts.length > 0) {
        if (!signalRConnection) {
          if (applicationState.rooms.length > 0) {
            getNegotiationUrl().then((r) => {
              const newConnection = createConnection(r.url, r.accessToken);

              newConnection.start().then(() => {
                newConnection.on('newTelemetry', (data) => {
                  console.log('new telemetry');
                  const state = { ...applicationState };
                  updateStateFromSignalRTelemetry(
                    setApplicationState,
                    state,
                    data[0],
                  );
                });
                setSignalRConnection(newConnection);
              });
            });
          }
        }
      }
    }
  }, [inProgress, accounts, applicationState, signalRConnection]);

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

          {/* ATT OMARBETA KOMPONENTERNA. NÅGOT ANTIPATTERN SKER SOM GÖR ATT DE INTE OMRENDERAS NÄR APPLIKATIONSTILLSTÅNDET UPPDATERAS */}

          {applicationState.rooms.length > 0 && (
            <Main
              applicationState={applicationState}
              setApplicationState={setApplicationState}
            />
          )}

          {/* TEST FÖR ATT SE ATT STATE FUNGERAR */}
          {/* {applicationState.rooms.length > 0 && (
            <div
              style={{
                position: 'fixed',
                zIndex: 200,
                top: '200px',
                height: '600px',
              }}
            >
              {applicationState.rooms.map((r, i) => {
                return (
                  <>
                    <h1>{r.name}</h1>
                    <p>{r.temp}</p>
                    <p>{r.humidity}</p>
                  </>
                );
              })}
            </div>
          )} */}
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
