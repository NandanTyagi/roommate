import { msalInstance } from '../MSAL/msalConfigs';

const Logout = ({ applicationState, setApplicationState }) => {
  return (
    <li
      className="menu-item"
      id="menu-logout-btn"
      style={{ color: 'white' }}
      onClick={() => {
        msalInstance.logoutRedirect({
          mainWindowRedirectUri: '/',
        });
        setApplicationState({
          ...applicationState,
          menuOpen: false,
          loggedIn: false,
        });
      }}
    >
      Logga ut
    </li>
  );
};

export default Logout;
