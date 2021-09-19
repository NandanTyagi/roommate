import Login from '../componets/Login';
import Logout from '../componets/Logout';

const MenuModal = ({ applicationState, setApplicationState }) => {
  return (
    <div className="menu-modal-container">
      <div className="menu-container">
        <ul className="menue">
          {!applicationState.loggedIn ? (
            <Login
              applicationState={applicationState}
              setApplicationState={setApplicationState}
            />
          ) : (
            <Logout
              applicationState={applicationState}
              setApplicationState={setApplicationState}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuModal;
