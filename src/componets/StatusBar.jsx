import ActButton from "./ActButton";

function StatusBar({ applicationState, setApplicationState }) {
  const isAlarm = false;
  return (
    <>
      {applicationState.alarms.length === 0 ? (
        <div className="status-container">
          <h2 className="status">
            Status: <span id="status">Inga larm</span>
          </h2>
          <div className="act-btn nodisplay" id="act-btn">
            Åtgärda
          </div>
          {applicationState.showResetBtn && 
            <button
              onClick={() =>
                setApplicationState({
                  ...applicationState,
                  showResetBtn: false,
                })
              }
            >
              {" "}
              Tillbaka
            </button>
          }
        </div>
      ) : (
        <div className="status-container">
          <h2 className="status alert">
            Status:{" "}
            {applicationState.alarms?.length > 1 ? (
              <span id="status">
                {applicationState.alarms?.length} aktiva larm!
              </span>
            ) : (
              <span id="status">
                {applicationState.alarms?.length} aktivt larm!
              </span>
            )}
          </h2>
          {applicationState.loggedIn && (
            <ActButton
              applicationState={applicationState}
              setApplicationState={setApplicationState}
            />
          )}
        </div>
      )}
    </>
  );
}

export default StatusBar;
