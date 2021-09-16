import { Configuration } from "@azure/msal-browser";
import { EventMessage, EventType, PublicClientApplication, AuthenticationResult,PopupRequest } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: "86c88538-2e16-46d1-b3f4-e26cd8d8eabc",
    authority: "https://login.microsoftonline.com/9bfa1706-1ffc-494d-a63e-dbbb34c4796b",
    redirectUri: "https://localhost:5000/signin_callback",
    postLogoutRedirectUri: "/"
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

export const loginRequest: PopupRequest = {
  scopes: ["User.Read"]
};