import { useState, useEffect } from 'react';
import AllRooms from './AllRooms';
import AlarmedRooms from './AlarmedRooms';

function Main({ applicationState, setApplicationState }) {
  const [render, setRender] = useState(false);

  // Just to make componente rerender when reset btn changes
  useEffect(() => {
    if (applicationState.showResetBtn) {
      setRender(true);
    }
  }, [applicationState.showResetBtn]);

  return (
    <>
      {!applicationState.showResetBtn ? (
        <AllRooms
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />
      ) : (
        <AlarmedRooms
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />
      )}
    </>
  );
}

export default Main;
