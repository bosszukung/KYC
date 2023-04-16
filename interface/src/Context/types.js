import {FI, Client, KYCRequest, User} from '../Repo/Function'
import {AUTH} from './actionType'
import assert from 'assert';

const FetchedDataType = {
  key: [Client, FI, User, KYCRequest]
};
  
const InitialStateType = {
  userDetails: {}, 
  isUserLoggedIn: false,
  loading: false,
  pageNo: 1,
  totalPageNumber: 0,
  data: [Client, FI, User, KYCRequest], 
  fetchedData: FetchedDataType
};


const ActionMap = (obj) => { 
  const actionMap = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        actionMap[key] = val === undefined 
        ? { type: key }
        : {type: key, payload: val};
    }
  }

  return actionMap;
};

const AuthPayload = {
  [AUTH.SET_USER_DETAILS]: {},
  [AUTH.SET_LOGIN_STATUS]: false,
  [AUTH.SET_LOADING]: false,
  [AUTH.SET_DATA]: {
      data: [Client, FI, User, KYCRequest],
      Totalpages: 0,
      currentPage: 1
  },
  [AUTH.SET_FETCHED_DATA]: {
      pageNo: '',
      data: [Client, FI, User, KYCRequest].map(Class => new Class()),
  },
  [AUTH.RESET]: undefined
};

assert(AuthPayload[AUTH.RESET] === undefined);

const authActions = Object.keys(ActionMap(AuthPayload)).map(
  key => ActionMap(AuthPayload)[key]
);

export {
  FetchedDataType, 
  InitialStateType, 
  ActionMap, 
  AuthPayload,
  authActions
};
