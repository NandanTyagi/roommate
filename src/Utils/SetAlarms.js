/* This function sets all the alarms in each room
depending upon the min and max values allowde by the restAPI */
export const SetAlarms = (appState, setAppState) => {
  console.log('current state', appState.rooms);
  // Create new room array
  let newRooms = [];
  // If there are rooms in the application state
  if (appState.rooms != null) {
    console.log('recalculate alarms');
    // Itterate over the rooms
    appState.rooms.forEach((r, i) => {
      // Identify the oldRoom object
      let oldRoom = appState.rooms[i];
      // Identify the temprature parameters for current room
      const maxTemp = r.maxTemp;
      const minTemp = r.minTemp;
      const temp = r.temp;
      // Set conditions for the min an max temprature
      if (maxTemp < temp || minTemp > temp) {
        // If alarm conditions are met set alarm to true
        oldRoom.isAlarm = true;
        oldRoom.isTempAlarm = true;
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
          oldRoom.isAlarm = true;
          oldRoom.isHumidAlarm = true;
        }
        // Append the oldRoom with uppdated alarm flags to the newRooms Array
        newRooms.push(oldRoom);
      }
      // Add the newRooms array to the applicationState.rooms array
      setAppState((prev) => ({ ...prev, rooms: newRooms }));

      console.log('Checking newAppState', appState);
      console.log('Checking newRooms', newRooms);
      console.log('Checking oldRoom', oldRoom);
      console.log('Checking i', i);
      console.log('Checking max temp', maxTemp);
      console.log('Checking min temp', minTemp);
      console.log('Checking temp', temp);
    });
    // Update the applicationState.alarms array with new alarms
    const alarms = appState.rooms.filter((d) => d.isAlarm === true);
    setAppState((prev) => ({ ...prev, alarms: alarms }));
  }
};
export default SetAlarms;
