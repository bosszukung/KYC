import React, {createContext, useContext, useReducer} from "react";
import {authReducer} from "./reducer"
import { InitialState } from "./details";
import { InitialStateType } from "./types";
import assert from "assert";

const AuthContext = createContext({
    state: InitialState,
    dispatch: () => null,
  });

export function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(
        authReducer, InitialState
    );
    assert(
        state instanceof InitialStateType, 
        "Invalid state"
    );
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
export default AuthContextProvider;
  
export const useAuthContext = () => useContext(AuthContext);