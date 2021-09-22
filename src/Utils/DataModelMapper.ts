import { SmartHut } from "../../types";
import { ApiDataObject } from '../Data';
import React from "react";

export interface Locations {
  [key: string]: SmartHut.DeviceExtended[] | null
}


export const createApiDataFromGetBuildingAndDevicesData: (input: SmartHut.getBuildingAndDevicesData) => ApiDataObject[] | null = (input) => {

  console.log("data to work with", input);
  console.log("data to work with", input.name);

  let output: ApiDataObject[] | null = [];


  input.devices.forEach((d: SmartHut.Device) => {

    const roomName = d.name.split(" ").slice(1).join(" ");
    let object: ApiDataObject | undefined = output?.find(o => o.name === roomName);
    let alreadyExistxist = false;
    if (object == null) {
      object = {
        name: roomName
      }
    } else {
      alreadyExistxist = true;
    }
    const typeOfSensor = d.name.split(" ").splice(0, 1).join("");

    console.log(typeOfSensor);
    switch (typeOfSensor.toLowerCase()) {
      case "humidity": {
        object.humiditySensorId = d.id;
        object.maxHumidity = d.maxValue;
        object.minHumidity = d.minValue;
        object.humidity = "0";
        object.isHumidAlarm = false;
        break;
      }
      case "temperature": {
        object.tempSensorId = d.id;
        object.maxTemp = d.maxValue;
        object.minTemp = d.minValue;
        object.temp = "0";
        object.isTempAlarm = false;
        break;
      }
      default: {
        throw new Error("Error, a new kind of sensor was installed (not humidity and not temperature")
      }
    }

    object.isReset = false;
    object.isAlarm = false;
    object.id = "What id goes here?";

    if (!alreadyExistxist) {
      output?.push(object);
    }

  })
  return output;
}
