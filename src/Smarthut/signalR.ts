import axios, { AxiosResponse } from "axios"
import { loginRequest, msalInstance } from "../MSAL/msalConfigs";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import React from "react";
import { ApiDataObject, SmartHut } from "../../types";


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
    .then((res: AxiosResponse<any>) => res.data)
    .catch((error) => {
      console.log(error)
    })

}

export const createConnection: (url: string, token: string) => HubConnection = (url, token) => {
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

export const updateStateFromSignalRTelemetry: (setter: React.Dispatch<React.SetStateAction<{
  menuOpen: boolean;
  loggedIn: boolean;
  showResetBtn: boolean;
  rooms: ApiDataObject[];
  alarms: {
    id: string;
    name: string;
    temp: string;
    humidity: string;
    isTempAlarm: boolean;
    isHumidAlarm: boolean;
    isReset: boolean;
    isAlarm: boolean;
  }[];
  user: string;
  units: null;
}>>
  , state: { rooms: ApiDataObject[] }, data: SmartHut.NewTelemetry)
  => void = (setter, state, data) => {
    const isHumidity = state.rooms.some(o => o.humiditySensorId?.toLocaleLowerCase() === data.deviceId.toLocaleLowerCase());
    let index: number;
    if (isHumidity) {
      console.log("is humidity");
      index = state.rooms.findIndex(o => o.humiditySensorId?.toLocaleLowerCase() === data.deviceId.toLocaleLowerCase());
      const currentObject = { ...state.rooms[index] };
      currentObject.humidity = data.value.toString();
      if (index != null) {
        setter(prev => ({
          ...prev,
          rooms: [
            ...prev.rooms.slice(0, index),
            {
              ...prev.rooms[index],
              humidity: data.value.toString()
            },
            ...prev.rooms.slice(index + 1)
          ]
        }))

      }
    } else {
      console.log("is temp");
      index = state.rooms.findIndex(o => o.tempSensorId?.toLocaleLowerCase() === data.deviceId.toLocaleLowerCase());
      const currentObject = { ...state.rooms[index] };
      currentObject.temp = data.value.toString();
      if (index != null) {
        setter(prev => ({
          ...prev,
          rooms: [
            ...prev.rooms.slice(0, index),
            {
              ...prev.rooms[index],
              temp: data.value.toString()
            },
            ...prev.rooms.slice(index + 1)
          ]
        }))

      }
    }
  }