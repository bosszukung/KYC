import {FI, Client, KYCRequest, User} from '../Repo/Function'
import {AUTH} from './actionType'

export type FetchedDataType = {
  [key: string]: (Client | FI | User | KYCRequest)[];
};
  
export type InitialStateType = {
  userDetails: User;
  isUserLoggedIn: boolean;
  loading: boolean;
  pageNo: number;
  totalPageNumber: number;
  data: (Client | FI | User | KYCRequest)[]; 
  fetchedData: FetchedDataType;
};


export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthPayload = {
  [AUTH.SET_USER_DETAILS]: User;
  [AUTH.SET_LOGIN_STATUS]: boolean;
  [AUTH.SET_LOADING]: boolean;
  [AUTH.SET_DATA]: {
      data: (Client | FI | User | KYCRequest)[];
      Totalpages: number;
      currentPage: number;
  },
  [AUTH.SET_FETCHED_DATA]: {
      pageNo: string;
      data: (Client | FI | User | KYCRequest)[];
  },
  [AUTH.RESET]: any;
};

export type AuthAction = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>]

