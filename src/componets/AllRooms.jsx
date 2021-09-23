import React, { useState, useEffect } from 'react';
import Card from './Card';

const AllRooms = ({ applicationState, setApplicationState }) => {
  const [rooms, setRooms] = useState(applicationState.rooms);

  return (
    <>
      <div className="header-clearfix"></div>
      <main className="container-main">
        <div className="container-grid">
          {rooms.map((r) => (
            <Card
              key={r.tempSensorId}
              id={r.name}
              name={r.name}
              temp={r.temp}
              humid={r.humidity}
              isTempAlarm={r.isTempAlarm}
              isHumidAlarm={r.isHumidAlarm}
              isAlarm={r.isAlarm}
              isReset={r.isReset}
              applicationState={applicationState}
              setApplicationState={setApplicationState}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default AllRooms;
