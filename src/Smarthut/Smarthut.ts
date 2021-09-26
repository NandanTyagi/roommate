import axios, { AxiosResponse } from "axios";
import { SmartHut } from "../../types";
import { loginRequest, msalInstance } from "../MSAL/msalConfigs";


//Defines the differen actions that can be done.

type SmartHutAction = "getBuilding" | "getBuildingAndDevices" | "getBuildingDevices" |
  "getDeviceInfo" | "getAlarmLogs" | "resetAlarm" | "getUnits" | "setAlarmAcknowledge";


//Optional argument, id, is needed when calling an endpoint that takes an id to resolve.
type SmartHutArgs = {
  id?: string,
  user?: string
} | undefined


//smartHutAction is meant to be a middle layer between the client and smarthut API. 
//All logic lives here for API interaction. An axios instance is configured and then the endpoint depends
//on the action-argument (see the switch block for details). Using axios.

export const smartHutAction = async (action: SmartHutAction, args: SmartHutArgs = undefined) => {

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

  axios.defaults.baseURL = 'https://api.smarthut.se';
  axios.defaults.headers.common['authorization'] = `Bearer ${response.accessToken}`;

  switch (action) {
    case "getBuildingAndDevices": {
      if (args?.id == null) { throw new Error("Missing a building id for getBuildingDevices request."); } else {
        return axios.get(`/BuildingInfo/${args.id}/true`)
          .then((res: AxiosResponse<SmartHut.getBuildingData>) => res)
          .catch((error) => {
            console.log(error)
          })
      }
    }
    case "getBuilding": {
      return axios.get("/BuildingInfo/GetMyBuilding")
        .then((res: AxiosResponse<SmartHut.getBuildingData>) => res)
        .catch((error) => {
          console.log(error)
        })
    }
    case "getBuildingDevices": {
      if (args?.id == null) { throw new Error("Missing a building id for getBuildingDevices request."); } else {
        return axios.get(`/DeviceInfo​/GetBuildingDevices​/${args.id}`)
          .then(res => res)
          .catch((error) => {
            console.log(error)
          })
      }
    }
    case "getUnits": {
      return axios.get(`/unit`)
        .then(res => res)
        .catch((error) => {
          console.log(error)
        })
    }

    case "setAlarmAcknowledge": {
      return axios.post('https://smarthut.azurewebsites.net/api/restorealarm', {
        deviceId: args?.id,
        userName: args?.user
      })
      .then((response) => {
        console.log(response);
        console.log('post reset request');
      }, (error) => {
        console.log("error post" + error);
      });
    }

    // case "getDeviceInfo": {
    //   if (args?.id == null) { throw new Error("Missing a device id for getDeviceInfo request."); } else {
    //     return axios.get(`/DeviceInfo​/${args.id}`)
    //       .then(res => res)
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }
    // }
    // case "getAlarmLogs": {
    //   if (args?.id == null) { throw new Error("Missing a device id for getAlarmLogs request."); } else {
    //     return axios.get(`/DeviceInfo​/${args.id}`)
    //       .then(res => res)
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }
    // }
  }

  return null;
}