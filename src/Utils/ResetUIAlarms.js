//This function takes the application state, name for the rooms and id which is the name of the room
export const ResetUIAlarms = (appState, name, iD) => {
    //Needs refactoring, can be misleading because the id either set to guid or completely
    const alarmedRooms = appState.rooms.filter(
        (room) => room.id === iD
    );
    alarmedRooms.forEach(room => {
        if (room.name === name) {
            room.isReset = true;
            room.isAlarm = false;
        }
    });
}

export default ResetUIAlarms
