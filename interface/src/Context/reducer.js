import { InitialState } from "./details";

export function authReducer(state, action) {

  switch (action.type) {
    case "SET_LOGIN_STATUS":
      return { ...state, isUserLoggedIn: action.payload };
  
    case "SET_LOADING":
      return { ...state, loading: action.payload };
  
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: { ...action.payload },
      };
  
    case "SET_DATA":
      const { data, Totalpages, currentPage } = action.payload;
      return {
        ...state,
        data,
        totalPageNumber: Totalpages,
        pageNo: currentPage,
      };
  
    case "SET_FETCHED_DATA":
      const { data: fetchedData, pageNo } = action.payload;
      return {
        ...state,
        fetchedData: {
          ...state.fetchedData,
          [pageNo]: fetchedData,
        },
      };
  
    case "RESET":
      return InitialState;
  
    default:
      return state;
  }
};

