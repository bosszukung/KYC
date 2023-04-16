import assert from 'assert';
import {FI, Client, KYCRequest, User} from '../Repo';
import {AUTH} from './actionType';

export function setLoginStatus(payload) {
    assert.strictEqual(
        typeof payload, 
        'boolean',
        'Invalid payload: Login status must be provided as a boolean value.'
    );
    return {
       type: AUTH.SET_LOGIN_STATUS, payload,
    };
};

export function setLoading(payload) {
    assert.strictEqual(
        typeof payload, 
        'boolean', 
        'Invalid payload: Login status must be provided as a boolean value.'
    );
    return {
        type: AUTH.SET_LOADING, payload,
    };
};

export function setUserDetails(payload) {
    assert.ok(
        payload instanceof User, 
        'Invalid payload: User details must be provided as an object of type User.'
    );
    return {
        type: AUTH.SET_USER_DETAILS
    };
};

export function setData(payload) {
    const isDataValid = payload.data.every(item =>
        item instanceof Client ||
        item instanceof FI ||
        item instanceof User ||
        item instanceof KYCRequest
    );
    assert(
        isDataValid,
        'Invalid payload: data must be an array of Customer, Bank, User, or KycRequest objects.'
    );
    assert(
        Array.isArray(payload.data), 
        'Invalid payload: data must be an array.'
    );
    assert(
        Number.isInteger(payload.Totalpages), 
        'Invalid payload: totalPages must be a number.'
    );
    assert(
        Number.isInteger(payload.currentPage), 
        'Invalid payload: currentPage must be a number.'
    );
    return {
        type: AUTH.SET_DATA,
        payload,
    };
};


export function setFetchedData(payload) {
    assert(
        typeof payload.pageNo === 'string',
        'Invalid payload: pageNo must be a string.'
    );
    const isDataValid = payload.data.every(item =>
        item instanceof Client ||
        item instanceof FI ||
        item instanceof User ||
        item instanceof KYCRequest
    );
    assert(
        isDataValid,
        'Invalid payload: data must be an array of Customer, Bank, User, or KycRequest objects.'
    );
    assert(
        Array.isArray(payload.data), 
        'Invalid payload: data must be an array.'
    );
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
