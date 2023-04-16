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
// assert(typeof InitialStateType.userDetails === 'object' && 
// InitialStateType.userDetails instanceof User);
// assert(typeof InitialStateType.isUserLoggedIn === 'boolean');
// assert(typeof InitialStateType.loading === 'boolean');
// assert(typeof InitialStateType.pageNo === 'number');
// assert(typeof InitialStateType.totalPageNumber === 'number');
// assert(Array.isArray(InitialStateType.data));
// for (const item of InitialStateType.data) {
//   assert(
//       item instanceof Client || 
//       item instanceof FI || 
//       item instanceof User || 
//       item instanceof KYCRequest
//   );
// };
// assert(typeof InitialStateType.fetchedData === 'object');


const ActionMap = (obj) => { 
  const actionMap = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        actionMap[key] = val === undefined 
        ? { type: key }
        : {type: key, payload: val};

        // assert(
        //     typeof actionMap[key].type === 'string'
        // );
        // assert(
        //     typeof actionMap[key].payload === 'undefined' || 
        //     typeof actionMap[key].payload === 'object'
        // );
    }
  }

  // assert(
  //     Object.keys(actionMap).every(
  //         (k) => obj.hasOwnProperty(k)
  //     )
  // );
  // assert(
  //     Object.keys(obj).every(
  //         (k) => actionMap.hasOwnProperty(k)
  //     )
  // );

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
// assert(typeof AuthPayload[AUTH.SET_USER_DETAILS] === 'object' && 
// AuthPayload[AUTH.SET_USER_DETAILS] instanceof User);
// assert(typeof AuthPayload[AUTH.SET_LOGIN_STATUS] === 'boolean');
// assert(typeof AuthPayload[AUTH.SET_LOADING] === 'boolean');
// // for (const item of AuthPayload[AUTH.SET_DATA].data) {
// //   assert(
// //       item instanceof Client || 
// //       item instanceof FI || 
// //       item instanceof User || 
// //       item instanceof KYCRequest
// //   );
// // }
// assert(typeof AuthPayload[AUTH.SET_DATA].Totalpages === 'number');
// assert(typeof AuthPayload[AUTH.SET_DATA].currentPage === 'number');
// assert(typeof AuthPayload[AUTH.SET_FETCHED_DATA].pageNo === 'string');
// assert(Array.isArray(AuthPayload[AUTH.SET_FETCHED_DATA].data));
// for (const item of AuthPayload[AUTH.SET_FETCHED_DATA].data) {
//   assert(
//       item instanceof Client || 
//       item instanceof FI || 
//       item instanceof User || 
//       item instanceof KYCRequest
//   );
// }
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
