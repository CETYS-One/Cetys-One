import * as React from "react";
import { useState } from "react";
import { IUserToken } from "../types/strapi";

interface IAuthContext {
  user?: IUserToken;
  setUserData: (user: IUserToken | undefined) => void;
}

interface PropTypes {
  children: React.ReactNode;
  userData?: IUserToken;
}

export const AuthContext = React.createContext<IAuthContext>({
  user: undefined,
  setUserData: () => {},
});

const AuthProvider = ({ children, userData }: PropTypes) => {
  const [user, setUser] = useState<IUserToken | undefined>(userData);

  React.useEffect(() => {
    if (!userData) return;
    setUser(userData);
  }, [userData]);

  const setUserData = (user: IUserToken | undefined) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
