import { useState } from 'react';

const ResetButton = ({ hide, id, applicationState, setApplicationState }) => {
  const [isHidden, setIsHidden] = useState(!hide);
  const [iD, setiD] = useState(id);
  const handelReset = () => {
    setApplicationState({ ...applicationState, reset: true });
    const thisAlarmedRoom = applicationState.alarms.filter(
      (room) => room.id === iD,
    );
    const currentRoomId = thisAlarmedRoom[0].id;
    //setApplicationState({ ...applicationState, roomid: currentRoomId });  
    applicationState.rooms.map((r) => {
      if (r.id === currentRoomId && r.isHumidAlarm) {
        console.log('This room has a humidityalarm', r);
        setApplicationState({ ...applicationState, deviceId: r.tempSensorId });
        // Do something with API
      }
      if (r.id === currentRoomId && r.isTempAlarm) {
        console.log('This room has a tepmrature alarm', r);
        setApplicationState({ ...applicationState, deviceId: r.humiditySensorId });
        // Do something with API
      }
    });
  };
  if (isHidden) {
    return (
      <div className="reset-btn hide" id={'reset-btn-' + { iD }}>
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
