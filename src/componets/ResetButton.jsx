import { ClientConfigurationErrorMessage } from "@azure/msal-common";
import {ResetUIAlarms} from '../Utils/ResetUIAlarms';
import {ResetAPIAlarms} from '../Utils/ResetAPIAlarms';
import { useState } from "react";

const ResetButton = ({ name, hide, id, applicationState, setApplicationState }) => {
  const [isHidden, setIsHidden] = useState(!hide);
  const [iD, setiD] = useState(id);
  const handelReset = () => {
    // setApplicationState({ ...applicationState, reset: true });
    console.log("Tryckt");
    console.log(id);
    console.log(name);
    console.log(applicationState);
    console.log(applicationState.alarms);
    ResetUIAlarms(applicationState, name, id);
    ResetAPIAlarms(applicationState, setApplicationState, name, id);
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
