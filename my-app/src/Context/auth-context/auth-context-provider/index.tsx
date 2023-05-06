import React from "react";
import {createContext, useContext, useReducer,} from "react";
import {authReducer} from "../reducer/reducer"
import { InitialState } from "../details";
import { InitialStateType } from "../types";

const authContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: InitialState,
  dispatch: () => null,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, InitialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider;
export const useAuthContext = () => useContext(authContext);
