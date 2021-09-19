import { useState, useEffect } from 'react';
import AllRooms from './AllRooms';
import AlarmedRooms from './AlarmedRooms';

function Main({ applicationState }) {
  const [render, setRender] = useState(false);
  console.log('From main', applicationState.showResetBtn);

  useEffect(() => {
    if (applicationState.showResetBtn) {
      setRender(true);
      console.log('From main', render);
    }
  }, [applicationState.showResetBtn]);

  return (
    <>
      {!applicationState.showResetBtn ? (
        <AllRooms applicationState={applicationState} />
      ) : (
        <AlarmedRooms applicationState={applicationState} />
      )}
    </>
  );
}

export default Main;
