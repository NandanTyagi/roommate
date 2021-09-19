import { useState } from 'react';
import ResetButton from './ResetButton';

function Card({
  id,
  name,
  temp,
  humid,
  isTempAlarm,
  isHumidAlarm,
  isReset,
  isAlarm,
  applicationState,
  setApplicationState,
}) {
  const [cardId, setCardId] = useState(id);
  const [cardName, setCardName] = useState(name);
  const [cardTemp, setCardTemp] = useState(temp);
  const [cardHumid, setCardHumid] = useState(humid);
  const [cardIsTempAlarm, setCardIsTempAlarm] = useState(isTempAlarm);
  const [cardIsHumidAlarm, setCardIsHumidAlarm] = useState(isHumidAlarm);
  const [cardResetBtn, setCardResetBtn] = useState(isReset);
  return (
    <>
      <div className={'card'} id={'card-' + cardId}>
        <div className="container-room">
          <div className="room" id="room-1-name">
            {cardName}
          </div>
          <div className="info">
            Värme:
            <span className="temp normal" id="room-1-temp">
              {cardTemp}
            </span>
            {cardIsTempAlarm && (
              <span className="warning-icon-container">
                <i
                  className="warning-icon fas fa-exclamation"
                  id="room-1-temp-icon"
                ></i>
              </span>
            )}
          </div>
          <div className="info">
            Luft Fuktighet:
            <span className="humid normal" id="room-1-humid">
              {cardHumid}
            </span>
            {cardIsHumidAlarm && (
              <span className="warning-icon-container">
                <i
                  className="warning-icon fas fa-exclamation"
                  id="room-1-humid-icon"
                ></i>
              </span>
            )}
          </div>
        </div>
        {applicationState.showResetBtn && (
          <ResetButton
            hide={isAlarm}
            id={cardId}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        )}
      </div>
    </>
  );
}

export default Card;
