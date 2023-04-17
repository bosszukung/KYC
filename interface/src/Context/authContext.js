import React, {createContext, useContext, useState} from "react";
import {authReducer} from "./reducer"
import { InitialState } from "./details";

const AuthContext = createContext({
    state: InitialState,
    dispatch: () => null,
  });

export function AuthContextProvider({children}) {
    const [state, dispatch] = useState(
        authReducer, InitialState
    );
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
export default AuthContextProvider;
  
export const useAuthContext = () => useContext(AuthContext);