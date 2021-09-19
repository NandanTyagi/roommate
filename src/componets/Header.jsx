import MenuBtn from './MenuBtn';
import StatusBar from './StatusBar';

function Header({ applicationState, setApplicationState }) {
  console.log('FromHeader', applicationState);
  return (
    <header>
      <div className="title-container">
        <div className="logo-container">
          <img className="logo" src="./ymcalogo.png" alt="YMCA Logo" />
        </div>
        <div className="title">
          <h1>RoomMate</h1>
        </div>
        <MenuBtn
          applicationState={applicationState}
          setApplicationState={setApplicationState}
        />
      </div>
      <StatusBar
        applicationState={applicationState}
        setApplicationState={setApplicationState}
      />
    </header>
  );
}

export default Header;
