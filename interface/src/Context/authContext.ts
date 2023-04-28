import React, {createContext, useContext, useState} from "react";
import {authReducer} from "./reducer"
import { InitialState } from "./details";
import { InitialStateType } from "./types";

const AuthContext = createContext<{
    state: InitialStateType,
    dispatch: React.Dispatch<any>
  }> ({
    state: InitialState,
    dispatch: () => null
  });

export function AuthContextProvider({children = React.ReactNode}) {
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