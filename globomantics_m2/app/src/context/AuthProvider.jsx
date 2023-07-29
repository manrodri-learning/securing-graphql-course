import React from "react";

export const AuthContext = React.createContext();
const Provider = AuthContext.Provider;

export function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = React.useState({
    token: null,
    userData: {},
  });

  const isAuthenticated = () => authInfo.token !== null;

  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo }}>
      {children}
    </Provider>
  );
}
