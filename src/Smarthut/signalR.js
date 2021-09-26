import axios, { AxiosResponse } from "axios"
import { loginRequest, msalInstance } from "../MSAL/msalConfigs";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'



export const getNegotiationUrl = async () => {

  //we start by gettng the active account with MSAL to obtain the token required for the API calls.
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account
  });

  //we configure the axios instance with the baseUrl and header that carries the token.

  console.log("signalR username", response.account?.username);
  axios.defaults.headers.common['X-MS-SIGNALR-USERID'] = response.account?.username;


  return axios.get(`https://smarthut.azurewebsites.net/api/negotiate`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error)
    })

}

export const createConnection = (url, token) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: () => {
        return token
      },
    })
    // .withAutomaticReconnect()
    .build();

  return newConnection;
}

export const getUpdatedApiDataObjectFromNewTelemetry = (state, data) => {
  const isHumidity = state.rooms.some(o => o.humiditySensorId?.toLocaleLowerCase() === data.deviceId.toLocaleLowerCase());
  let index;
  if (isHumidity) {
    // console.log("is humidity");
    index = state.rooms.findIndex(o => o.humiditySensorId?.toLocaleLowerCase() === data.deviceId.toLocaleLowerCase());
    const currentObject = { ...state.rooms[index] };
    const humidFormatter = data.value;
    const formattedHumidity = Math.round(humidFormatter * 10) / 10;
    // console.log("value", formattedHumidity, humidFormatter);
    currentObject.humidity = data.value
    if (index != null) {
      return [index,
        formattedHumidity
        , "humidity"
      ]
    }
  } else {
    //console.log("is temp");
    index = state.rooms.findIndex(o => o.tempSensorId?.toLocaleLowerCase() === data.deviceId.toLocaleLowerCase());
    const currentObject = { ...state.rooms[index] };
    const tempFormatter = data.value;
    const formattedTemp = Math.round(tempFormatter * 10) / 10;
    currentObject.temp = data.value
    if (index != null) {
      return [index,
        formattedTemp,
        "temp"
      ]

    }
  }
}