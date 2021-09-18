import React from 'react';
import { createLogicalOr } from 'typescript';
import ActButton from './ActButton';
import Card from './Card';

function Main({ applicationState }) {
  {
    if (applicationState.menuOpen) {
      console.log('From main', applicationState.menuOpen);
    }
    return (
      <>
        <main className="container-main">
          <div className="container-grid">
            <Card
              id={'1'}
              name={'name'}
              temp={'temp'}
              humid={'humid'}
              isTempAlarm={true}
              isHumidAlarm={true}
              isReset={true}
            />
            <Card
              id={'1'}
              name={'name'}
              temp={'temp'}
              humid={'humid'}
              isTempAlarm={true}
              isHumidAlarm={false}
              isReset={true}
            />
            <Card
              id={'1'}
              name={'name'}
              temp={'temp'}
              humid={'humid'}
              isTempAlarm={false}
              isHumidAlarm={false}
              isReset={false}
            />
          </div>
        </main>
      </>
    );
  }
}

export default Main;
