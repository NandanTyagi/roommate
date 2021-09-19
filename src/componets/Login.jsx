import { loginRequest, msalInstance } from '../MSAL/msalConfigs';

const Login = ({ applicationState, setApplicationState }) => {
  return (
    <li
      className="menu-item"
      id="menu-login-btn"
      style={{ color: 'white' }}
      onClick={() => {
        msalInstance.loginRedirect(loginRequest);
        setApplicationState({
          ...applicationState,
          menuOpen: false,
          loggedIn: true,
        });
      }}
    >
      Logga in
    </li>
  );
};

export default Login;
