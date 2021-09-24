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
  getUpdatedApiDataObjectFromNewTelemetry,
} from './Smarthut/signalR';
import { smartHutAction } from './Smarthut/Smarthut';
import { createApiDataFromGetBuildingAndDevicesData } from './Utils/DataModelMapper';
import Footer from './componets/Footer';
import { SetAlarms } from './Utils/SetAlarms';

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
    reset: false,
    isReset: false,
    deviceId: null,
    rooms: [],
    alarms: [],
    user: '',
    units: null,
  });

  const [signalRConnection, setSignalRConnection] = useState(null);

  useEffect(() => {
    /* This function sets all the alarms in each room
depending upon the min and max values allowde by the restAPI */
    SetAlarms(applicationState, setApplicationState);
  }, [applicationState.rooms[0]]);

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

  //Reset alarm
  useEffect(() => {
    if (applicationState.reset) {
      console.log('alarm 5', applicationState);
      smartHutAction('setAlarmAcknowledge', {
        id: applicationState.deviceId,
        user: applicationState.user,
      }).then((res) => {
        if (res != null) {
          console.log("återställ");
        }
      });
      setApplicationState({ ...applicationState, reset: false });
    }
  }, [applicationState.reset]);

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
                  //console.log('new telemetry');
                  const state = { ...applicationState };
                  const [index, formattedValue, typeOfValue] = getUpdatedApiDataObjectFromNewTelemetry(
                    state,
                    data[0],
                  );

                  //Updates only value that changed on last telemetry
                  setApplicationState(prev => ({
                    ...prev,
                    rooms: [
                      ...prev.rooms.slice(0, index),
                      {
                        ...prev.rooms[index],
                        [typeOfValue]: formattedValue
                      },
                      ...prev.rooms.slice(index + 1)
                    ]
                  }))
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

            // Pushes the menu modal back to z-index 1
            <div className="login-container z"></div>
          )}

          {/* ATT OMARBETA KOMPONENTERNA. NÅGOT ANTIPATTERN SKER SOM GÖR ATT DE INTE OMRENDERAS NÄR APPLIKATIONSTILLSTÅNDET UPPDATERAS */}

          {/* Issue #44 WebSocket gets disconnected all the time(Could be because i am trying to connect to it at 02:00)
          /N.T.*/}


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
        <Footer></Footer>
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
          <h2>Tryck på menyn för att logga in!</h2>
        </div>
        <Footer></Footer>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
