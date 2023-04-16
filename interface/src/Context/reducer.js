import { AUTH } from "./actionType";
import { InitialState } from "./details";
import { authActions, InitialStateType } from "./types";
import assert from "assert";

export function authReducer(state, action) {
  assert(state instanceof InitialStateType, "Invalid state");
  assert(action instanceof authActions, "Invalid action");

  switch (action.type) {
    case "SET_LOGIN_STATUS":
      assert(action.type === AUTH.SET_LOGIN_STATUS);
      assert(typeof action.payload === 'boolean');
      return { ...state, isUserLoggedIn: action.payload };
  
    case "SET_LOADING":
      assert(action.type === AUTH.SET_LOADING);
      assert(typeof action.payload === 'boolean');
      return { ...state, loading: action.payload };
  
    case "SET_USER_DETAILS":
      assert(action.type === AUTH.SET_USER_DETAILS);
      assert(typeof action.payload === 'object');
      return {
        ...state,
        userDetails: { ...action.payload },
      };
  
    case "SET_DATA":
      const { data, Totalpages, currentPage } = action.payload;
      assert(action.type === AUTH.SET_DATA);
      assert(typeof action.payload === 'object');
      return {
        ...state,
        data,
        totalPageNumber: Totalpages,
        pageNo: currentPage,
      };
  
    case "SET_FETCHED_DATA":
      const { data: fetchedData, pageNo } = action.payload;
      assert(action.type === AUTH.SET_FETCHED_DATA);
      assert(typeof action.payload === 'object');
      return {
        ...state,
        fetchedData: {
          ...state.fetchedData,
          [pageNo]: fetchedData,
        },
      };
  
    case "RESET":
      assert(action.type === AUTH.RESET);
      return InitialState;
  
    default:
      return state;
  }
};

