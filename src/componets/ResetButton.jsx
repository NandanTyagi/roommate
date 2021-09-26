
import { ClientConfigurationErrorMessage } from "@azure/msal-common";
import {ResetUIAlarms} from '../Utils/ResetUIAlarms';
import {ResetAPIAlarms} from '../Utils/ResetAPIAlarms';
import { useState } from "react";

const ResetButton = ({
  name,
  hide,
  id,
  applicationState,
  setApplicationState,
}) => {
  const [isHidden, setIsHidden] = useState(!hide);
  const [iD, setiD] = useState(id);
  const handelReset = (e) => {
    // setApplicationState({ ...applicationState, reset: true });
    console.log("Tryckt");
    // console.log(id);
    // console.log(name);
    // console.log(applicationState);
    // console.log(applicationState.alarms);
    ResetAPIAlarms(applicationState, setApplicationState, name, id);
    ResetUIAlarms(applicationState, name, id);
    console.log('From handel reset e:', e.target.innerText);
    e.target.innerText = 'Återställt';
    e.target.style.backgroundColor = 'dodgerblue';
  };
  if (isHidden) {
    return (
      <div className="reset-btn hide" id={'reset-btn-' + { iD }}>
        Återställ
      </div>
    );
  } else {
    return (
      <div className="reset-btn" id={{ iD }} onClick={(e) => handelReset(e)}>
        Återställ
      </div>
    );
  }
};

export default ResetButton;
