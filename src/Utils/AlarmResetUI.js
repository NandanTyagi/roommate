// This function resets the current room alarm flags to false.
export const AlarmResetUI = (currentRoomToReset, appState, setAppState) => {
  console.log('Current room from reset btn', currentRoomToReset);
  console.log('Current state from reset btn', appState.alarms);
  let newRoomsBeforeReset = appState.rooms.slice();
  let newRoomsAftertReset = [];
  let currRoom;
  let roomIndex;
  newRoomsBeforeReset.forEach((r, i) => {
    if (r.name === currentRoomToReset[0].name) {
      //   console.log('We r going to reset this room:', currentRoomToReset[0]);
      currRoom = currentRoomToReset[0];
      currRoom.isAlarm = false;
      currRoom.isTempAlarm = false;
      currRoom.isHumidAlarm = false;
      roomIndex = i;
      console.log('currRom', currRoom, 'i', i);
    }
  });

  //   console.log('New rooms before reset', newRoomsBeforeReset);
  //   console.log('New rooms after reset', newRoomsAftertReset);
  return newRoomsBeforeReset;
};

export default AlarmResetUI;
