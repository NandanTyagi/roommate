import { SmartHut } from "../../types";
import { ApiDataObject } from '../../Data';
import React from "react";

export interface Locations {
  [key: string]: SmartHut.DeviceExtended[] | null
}


// This function will create an object with all sensor data which better follows the structure of the components that
// needs to be rendered with the Data. The raw data input that comes from smarthut api is an array with sensors. The
// remodeled output data will instead be an object with keys being the name of the location, each with an Array
// containing all the sennsors beloning to that location.  

export const createRoomObjectsWithSensorData = (rawData: SmartHut.Device[]) => {

  console.log("createRoomObjectsWithSensorData input data", rawData);

  // The output sensor is and extended type of the old. It's the same as the original device, but including a new
  // propery "sensorType". Go to types.ts and check DeviceExtended for full definition.
  let sensors: SmartHut.DeviceExtended[] = [];

  rawData.forEach(r => {
    const newSensor: SmartHut.DeviceExtended = { ...r, sensorType: null };
    sensors.push(newSensor)
  })

  let locations: Locations = {}

  sensors.forEach(s => {

    const locationNameArray = s.name.split(" ");
    s.sensorType = locationNameArray[0];

    const locationName = locationNameArray.slice(1).join(" ");

    if (locations[locationName] == null) {
      locations[locationName] = []
    }
    locations[locationName]?.push(s);

  })
  console.log("createRoomObjectsWithSensorData output data", locations);


  return locations;

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
