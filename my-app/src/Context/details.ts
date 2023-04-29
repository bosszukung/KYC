import {InitialStateType}from './types'

export const InitialState: InitialStateType = {
    userDetails: {
        status: 1,
        position: 0,
        email: "",
        ID: "",
        name: "",
    },
    isUserLoggedIn: false,
    loading: false,
    pageNo: 1,
    totalPageNumber: 1,
    data: [],
    fetchedData: {},
};


