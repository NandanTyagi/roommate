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

  useEffect(() => {
    console.log('Testing', applicationState);
    const comparedRoom = applicationState.rooms.filter(
      (r) => r.name === cardId,
    );
    // if (comparedRoom.humidity !== null) {
    //   setCardHumid(comparedRoom.humidity);
    // }
    // setCardTemp(comparedRoom.temp);

    console.log('Compare Room', comparedRoom);
  }, [applicationState.rooms[0].humidity, applicationState.rooms[0].temp]);
  return (
    <>
      <div
        className={cardIsAlarm ? 'card alarm' : 'card'}
        id={'card-' + cardId}
      >
        <div className="container-room">
          <div className="room" id="room-1-name">
            {cardName}
          </div>
          <div className="info">
            Värme:
            <span className="temp normal" id="room-1-temp">
              {cardTemp + '°C'}
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
              {cardHumid ? cardHumid + '%' : 'N/A'}
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
