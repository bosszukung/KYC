import {AUTH} from './actionType';

export function setLoginStatus(payload) {
    return {
       type: AUTH.SET_LOGIN_STATUS, payload,
    };
};

export function setLoading(payload) {
    return {
        type: AUTH.SET_LOADING, payload,
    };
};

export function setUserDetails(payload) {
    return {
        type: AUTH.SET_USER_DETAILS
    };
};

export function setData(payload) {
    return {
        type: AUTH.SET_DATA,
        payload,
    };
};


export function setFetchedData(payload) {
    return {
        type: AUTH.SET_FETCHED_DATA,
        payload,
    };
};

export function kycRequestStatus() {
    return {
      type: AUTH.SET_KYC_REQUEST,
    };
};
  
export function resetStates() {
    return {
      type: AUTH.RESET,
    };
};
