//This function takes the application state, name for the rooms and id which is the name of the room
export const ResetAPIAlarms = (appState, setAppState, name, iD) => {
    //Needs refactoring, can be misleading because the id either set to guid or completely
    const alarmedRooms = appState.rooms.filter(
        (room) => room.id === iD
    );
    if(alarmedRooms[0].isTempAlarm === true && alarmedRooms[0].isHumidAlarm === true){
        setAppState({ ...appState, tempId: alarmedRooms[0].tempSensorId, humId: alarmedRooms[0].humiditySensorId, tempReset: true, humReset: true  });
        console.log("postalarm2");
    }
    else if(alarmedRooms[0].isTempAlarm === true && alarmedRooms[0].isHumidAlarm === false){
        console.log("postalarm1");
        console.log(alarmedRooms[0]);
        setAppState({ ...appState, tempId: alarmedRooms[0].tempSensorId, humId: alarmedRooms[0].humiditySensorId, tempReset: true, humReset: false });
        
    }
    else if(alarmedRooms[0].isTempAlarm === false && alarmedRooms[0].isHumidAlarm === true){
        setAppState({ ...appState, tempId: alarmedRooms[0].tempSensorId, humId: alarmedRooms[0].humiditySensorId, tempReset: false, humReset: true });
        console.log("postalarm0");
    }
}

export default ResetAPIAlarms
