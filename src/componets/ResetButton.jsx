import { ClientConfigurationErrorMessage } from "@azure/msal-common";
import { useState } from "react";

const ResetButton = ({ name, hide, id, applicationState, setApplicationState }) => {
  const [isHidden, setIsHidden] = useState(!hide);
  const [iD, setiD] = useState(id);
  const handelReset = () => {
    // setApplicationState({ ...applicationState, reset: true });
    const alarmedRooms = applicationState.rooms.filter(
      (room) => room.id === iD
    );
    alarmedRooms.forEach(room => {
      if(room.name === name){
        console.log("ROOOOOOOOOOOOOOOOM", room);
        room.isReset = true;
        room.isAlarm = false;
        console.log('All rooms', applicationState.rooms)
      }
    });
    // const currentRoomId = thisAlarmedRoom[0].id;
    // //setApplicationState({ ...applicationState, roomid: currentRoomId });
    // applicationState.rooms.map((r) => {
    //   if (r.id === currentRoomId && r.isHumidAlarm) {
    //     console.log('This room has a humidityalarm', r);
    //     // Do something with API
    //   }
    //   if (r.id === currentRoomId && r.isTempAlarm) {
    //     console.log('This room has a tepmrature alarm', r);
    //     // Do something with API
    //   }
    // });
    console.log("alaraming room", alarmedRooms);
  };
  if (isHidden) {
    return (
      <div className="reset-btn hide" id={"reset-btn-" + { iD }}>
        Återställ
      </div>
    );
  } else {
    return (
      <div className="reset-btn" id={{ iD }} onClick={(e) => handelReset()}>
        Återställ
      </div>
    );
  }
};

export default ResetButton;
