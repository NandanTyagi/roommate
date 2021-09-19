import React from 'react';
import Card from './Card';

const AllRooms = ({ applicationState }) => {
  return (
    <>
      <main className="container-main">
        <div className="container-grid">
          {applicationState.rooms.map((r) => (
            <Card
              id={r.id}
              name={r.name}
              temp={r.temp}
              humid={r.humidity}
              isTempAlarm={r.isTempAlarm}
              isHumidAlarm={r.isHumidAlarm}
              isAlarm={r.isAlarm}
              isReset={r.isReset}
              applicationState={applicationState}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default AllRooms;
