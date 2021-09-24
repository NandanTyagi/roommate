/* This function sets all the alarms in each room
depending upon the min and max values allowde by the restAPI */
export const SetAlarms = (appState, setAppState) => {
  //console.log('current state', appState.rooms);
  // Create new room array
  let newRooms = [];
  let newAlarmedRooms = [];
  // If there are rooms in the application state
  if (appState.rooms != null) {
    //console.log('recalculate alarms');
    // Itterate over the rooms
    appState.rooms.forEach((r, i) => {
      // Identify the oldRoom object
      let currentRoom = appState.rooms[i];
      // Identify the temprature parameters for current room
      const maxTemp = r.maxTemp;
      const minTemp = r.minTemp;
      const temp = r.temp;
      //console.log("ooooooooTEMP", temp, temp + 10);
      // Set conditions for the min an max temprature
      if (maxTemp < temp || minTemp > temp) {
        // If alarm conditions are met set alarm to true
        currentRoom.isTempAlarm = true;
      }
      else {
        currentRoom.isTempAlarm = false;
      }

      // If humidity sensor exists
      if (r.humidity !== null) {
        // Identify the humidity parameters for current room
        const maxHumidity = r.maxHumidity;
        const minHumidity = r.minHumidity;
        const humidity = r.humidity;
        // Set conditions for the min an max humidity
        if (maxHumidity < humidity || minHumidity > humidity) {
          // If alarm conditions are met set alarm to true
          currentRoom.isHumidAlarm = true;
        }
        else {
          currentRoom.isHumidAlarm = false;
        }

        if ((currentRoom.isHumidAlarm === true) || (currentRoom.isTempAlarm === true)) {
          currentRoom.isAlarm = true;
        }
        else {
          currentRoom.isAlarm = false;
        }
        // Append the oldRoom with uppdated alarm flags to the newRooms Array
        newRooms.push(currentRoom);
      }
      // Add the newRooms array to the applicationState.rooms array
      setAppState((prev) => ({ ...prev, rooms: newRooms }));

      // console.log('Checking newAppState', appState);
      // console.log('Checking newRooms', newRooms);
      // console.log('Checking oldRoom', currentRoom);
      // console.log('Checking i', i);
      // console.log('Checking max temp', maxTemp);
      // console.log('Checking min temp', minTemp);
      // console.log('Checking temp', temp);
    });
    // Update the applicationState.alarms array with new alarms

    const alarms = appState.rooms.filter((d) => 
      d.isAlarm === true
      );
    const unResettedAlarms = alarms.filter((d) => 
      d.isReset === false
      );
      
      console.log("Alarm log rooms", unResettedAlarms)
    setAppState((prev) => ({ ...prev, alarms: unResettedAlarms }));
  }
};
export default SetAlarms;
