//This function takes the application state, name for the rooms and id which is the name of the room
export const ResetAPIAlarms = (appState, setAppState, name, iD) => {
    //Needs refactoring, can be misleading because the id either set to guid or completely
    const alarmedRooms = appState.rooms.filter(
        (room) => room.id === iD
    );
    
    console.log("alarmedRooms"); 
    console.log(alarmedRooms[0].humiditySensorId);  
   
    if (alarmedRooms[0].humiditySensorId != null){
        setAppState({ ...appState, tempId: alarmedRooms[0].tempSensorId, humId: alarmedRooms[0].humiditySensorId, tempReset: true, humReset: true  });  
        console.log("postalarms temp and humidity");   
    }
    else{
       setAppState({ ...appState, tempId: alarmedRooms[0].tempSensorId, tempReset: true, humReset: false  });
       console.log("postalarms Only temp");   
   }
     
}

export default ResetAPIAlarms
