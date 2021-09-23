import { useState, useEffect } from 'react';
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
  const [cardIsAlarm, setCardIsAlarm] = useState(isAlarm);
  const [cardResetBtn, setCardResetBtn] = useState(isReset);

  console.log('From card', cardTemp);

  return (
    <>
      <div className={isAlarm ? 'card alarm' : 'card'} id={'card-' + id}>
        <div className="container-room">
          <div className="room" id="room-1-name">
            {name}
          </div>
          <div className="info">
            Värme:
            <span className="temp normal" id="room-1-temp">
              {temp + '°C'}
            </span>
            {isTempAlarm && (
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
              {humid ? humid + '%' : 'N/A'}
            </span>
            {isHumidAlarm && (
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
            id={id}
            applicationState={applicationState}
            setApplicationState={setApplicationState}
          />
        )}
      </div>
    </>
  );
}

export default Card;
