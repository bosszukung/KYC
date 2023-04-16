import { useCallback, useState } from "react";
import { setData, setFetchedData, useAuthContext} from '../../../Context';
import { FetchedDataType } from "../../../Context/types"; 
import {FI, FIStatus, Client, KYCServices, User} from '../../../Repo';
import { Success, Error } from "../../../unities";
import { assert } from "assert";

const rejectErrorCheck = (error) => 
error.message.includes("User deiend trasaction signature");

export function useAPI() {
    const { dispatch } = useAuthContext();
    const apiInstance = KYCServices.getInstance();
    const [listLodaing, setListLoading] = useState();
    
    const getFIList = useCallback(async (currentPage) => {
        try {
            setListLoading(true);
            const res = await apiInstance.AllFI(currentPage);
            assert(
                typeof currentPage === 'number',
                'Invalid argument: currentPage must be a number'
            );
            const data = res[1].filter((i) => ({...i}));
            dispatch(setData({data, TotalPage: +res[0].toString(), currentPage}));
            dispatch(setFetchedData({pageNo: currentPage +"", data}));
        } catch (error) {
            console.log(error);
            Error("Error while fetchinh Financial list");
        } finally {
            setListLoading(false);
        }
    }, [apiInstance, dispatch]);

    const AddFI = useCallback(async(details) => {
        try {
            const data = await apiInstance.AddFIAccount(details);
            assert(
                details instanceof FI,
                `Invalid argument: details must be an instance of FI, but received ${typeof details}`
            );
            Success("Successfully updated the data, it will takes few minutes to update");
            return data;
        } catch (error) {
            console.log(error);
            if(rejectErrorCheck(error)) {
                Error("User has rejected the action");
            } else {
                Error("Error while adding Financial Institution, please try again!");
            }
        }
    }, [apiInstance]);

    const updateTheFI = useCallback (async(updatedDetails) => {
        try {
            const data = await apiInstance.FIUpdate(updatedDetails);
            assert(
                typeof updatedDetails === 'object', 
                'Invalid argument: updatedDetails must be an object'
            );
            assert(
                typeof updatedDetails.id === 'string', 
                'Invalid argument: updatedDetails.id must be a string'
            );
            assert(
                typeof updatedDetails.email === 'string', 
                'Invalid argument: updatedDetails.email must be a string'
            );
            assert(
                typeof updatedDetails.name === 'string', 
                'Invalid argument: updatedDetails.name must be a string'
            );
            Success('Successfully updated the data, it will takes few minutes to update');
            return data;
        } catch (error) {
            console.log(error);
            if (rejectErrorCheck(error)) {
                Error("User has rejected the action");
            } else {
                Error("Error while updateing Financial detials, please try again");
            } 
        }
    }, [apiInstance]);

    const toggleBankStates = useCallback (async(id, status) => {
        try {
            const data = await apiInstance.ActiveteandDeactivete(id, status);
            assert(
                typeof id === 'string', 
                'Invalid argument: id must be a string'
            );
            assert(
                typeof status === 'boolean', 
                'Invalid argument: status must be a boolean'
            );
    
            Success(
                'Financial Institution status has been changed to ' + 
                (status ? "active" : "inactive")
            );
            return data;
        } catch (error) {
            console.log(error);
            if(rejectErrorCheck(error)) {
                Error('User has rejected the action');
            } else {
                Error('Eror while switching Financial Insitution status, please try agian later');
            }
        }
    }, [apiInstance]);

    /* Finanical Insitution functions */

    const getAllFiList = useCallback(async(currentPage) => {
        try {
            setListLoading(true);
            const res = await apiInstance.getClientofFI(currentPage);
            assert(
                typeof currentPage === 'number',
                'Invalid argument: currentPage must be a number between 1 and ' + Number.MAX_SAFE_INTEGER
            );
            console.log(res);
            dispatch(setData({
                data: res[1],
                TotalPage: +res[0].toString(),
                currentPage: 1
            }));
            dispatch(setFetchedData({
                pageNo: currentPage + "",
                data: res[1]
            }));
        } catch (error) {
            console.log(error);
            Error('Error while fetching Clients of Finacial Institution list');
        } finally {
            setListLoading(false)
        }
    }, [apiInstance, dispatch]);

    const gettheClientDetial = useCallback (async(id) => {
        try {
            const data = await apiInstance.gettheClientDetials(id);
            assert(
                typeof id === 'string',
                'Invalid argument: id must be strings'
            );
            return data;
        } catch (error) {
            console.log(error);
            Error("Error while fetching client details");
        }
    }, [apiInstance]);

    const addKycRequest = useCallback(async(data) => {
        try {
            const res = await apiInstance.AddKYC(
                data.client,
                data.time,
                data.note
            );
            assert(
                typeof data === 'object', 
                'Invalid argument: data must be an object'
            );
            assert(
                data.client instanceof Client,
                'Invalid argument: data must be an object of Cleint'
            );
            assert(
                typeof data.time === 'number',
                'Invalid argument: time must be a number'
            );
            assert(
                typeof data.note === 'string',
                'Invalid argument: note must be strings'
            );
            Success('sucessfully added KYC')
            return res
        } catch(error) {
            console.log(error);
            if (rejectErrorCheck(error)) {
                Error("User has rejected the action");
            } else {
                Error('Error whlie requestion KYC, pleaase try again');
            }
        }
    }, [apiInstance]);

    const RequesttKYCAgain = useCallback(async(id, note) => {
        try {
            const res = await apiInstance.reKYC(id, note);
            assert(
                typeof id === 'string',
                'Invalid argument: id must be strings'
            );
            assert(
                typeof note === 'string',
                'Invalid argument: note must be strings'
            );
            Success('Suceessfully  requested KYC again');
            return res;
        } catch (error) {
            console.log(error);
            if (rejectErrorCheck(error)){
                Error('User has rejectd the action');
            } else {
                Error('Error while requsting KYC please try again');
            }
        } 
    }, [apiInstance]);

    const updateKYCVerification = useCallback(async(data) => {
        try {
            const res = await apiInstance.KYCVerification(
                data.id,
                data.isVerified,
                data.note
            );
            assert(
                typeof data === 'object', 
                'Invalid argument: data must be an object'
            );
            assert(
                data.id === 'string',
                'Invalid argument: data.id must be an strings'
            );
            assert(
                typeof data.isVerified === 'boolean',
                'Invalid argument: data.isVerified must be a boolean'
            );
            assert(
                typeof data.note === 'string',
                'Invalid argument: note must be strings'
            );
            Success(`KYC request ${
                    data.isVerified 
                    ? "verified" 
                    : "rejected"
                } sucessfully` 
            );
            return res;
        } catch (error) {
            console.log(error);
            if (rejectErrorCheck(error)) {
                Error('User has rejected the action');
            } else {
                Error('Error while requesting KYC, please try again');
            } 
        }
    }, [apiInstance]);

    const searcForClient = useCallback(async(id) => {
        try {
            const res = await apiInstance.searchClient(id);
            assert(
                typeof id === 'string', 
                'Invalid argument: id must be strings' 
            );
            return res;
        } catch (error) {
            console.log(error);
            Error('Error while searching client');
        }
    }, [apiInstance]);

    /* Client Functions */

    const getFIKycRequest = useCallback(async(currentPage) => {
        try {
            console.log('Financial Insitutions list request');
            setListLoading(true);
            const res = await apiInstance.FIrequest(currentPage);
            assert(
                typeof currentPage === 'number',
                'Invalid argument: currentPage must be a number'
            );
            const data = res[1];
            dispatch(setData({data, TotalPage: +res[0].toString(), currentPage}));
            dispatch(setFetchedData({ pageNo: currentPage + "", data }));
        } catch (error) {
            console.log(error);
            Error('Error while feching client of financial institution list');
        } finally {
            setListLoading(false);
        }
    }, [apiInstance, dispatch]);

    const actionOnKYCRequest = useCallback(
        async(fiId, isApproved, note) => {
            console.log(isApproved, "approval status");
            try {
                const res = await apiInstance.KYCaction(
                    fiId,
                    isApproved,
                    note
                );
                assert(
                    typeof fiId === 'string',
                    'Invalid argument: fiId must be strings'
                );
                assert(
                    typeof isApproved === 'boolean',
                    'Invalid argument: isApproved must be boolean'
                );
                assert(
                    typeof note === 'string',
                    'Invalid argument: note must be strings'
                );
                console.log(res);
                Success("Data has sent to  you financial insitution");
                return res
            } catch (error) {
                console.log(error);
                if (error.message.includes('Finacial Institution is not active')) {
                    Error('Finacial Institution is inactive');
                } else if (rejectErrorCheck(error)) {
                    Error('User has rejected the action');
                } else {
                    Error('action has failed');
                }
            }
        }, [apiInstance]
    );

    const updateClientProfile = useCallback(async (name, email, number) => {
        try {
            const res = await apiInstance.updateProfile(name, email, number);
            assert(
                typeof name === 'string',
                'Invalid argument: name must be strings'
            );
            assert(
                typeof email === 'string',
                'Invalid argument: email must be strings'
            );
            assert(
                typeof number === 'string',
                'Invalid argument: number must be strings'
            );
            Success('Sucessfully uppdated profile');
            return res;
        } catch (error) {
            console.log(error);
            if (rejectErrorCheck(error)) {
                Error('User has rejected the action');
            } else {
                Error('Failed to update the profile');
            }
        }
    }, [apiInstance]);

    const updateDataHash = useCallback(async(hash) => {
        try{
            const res = await apiInstance.updateHash(hash);
            assert(
                typeof hash === 'string',
                'Invalid argument: hash must be strings'
            );
            Success("Data hash has been updated");
            return res;
        } catch (error) {
            console.log(error);
            if (rejectErrorCheck(error)) {
                Error('User has rejected the action');
            } else {
                Error('Error while updating data hash, please try again');
            }
        }
    }, [apiInstance]);

    const removeKycPremission = useCallback(async(id, note) => {
        try {
            const res = await apiInstance.removePremission(id, note);
            assert(
                typeof id === 'string',
                'Invalid argument: id must be strings'
            );
            assert(
                typeof note === 'string',
                'Invalid argument: note must be strings'
            )
            console.log(res);
            Success('Data permssion has been revoke');
            return res;
        } catch (error) {
            console.log(error);
            if (rejectErrorCheck(error)) {
                Error('User has reject the action');
            } else {
                Error('Failed to revoke data hash permission');
            }
        }
    }, [apiInstance]);

    const searchForFI = useCallback(async(id) => {
        try {
            const res = await apiInstance.searchforFI(id);
            assert(
                typeof id === 'string',
                'Invalid argument: id must be strings'
            )
            const formatedData = {isFi: res[1], FiDetails: res[2]};
            return formatedData
        } catch (error) {
            console.log(error);
            if (error.message.includes(
                'Financial Institution is not active')
            ) {
                Error('Financial Institution is inactive')
            } else {
                Error("Something went wrong, search operation failed");
            }
        }
    }, [apiInstance]);

    const getUserDetails = useCallback(async() => {
        try {
            const res = await apiInstance.getUserInfo()
            const user = {...res, type:User}
            console.log(user);
            if(user.status === FIStatus.Inactive) {
                throw new Error("This financial institution is inactive");
            }
            return user;
        } catch (error) {
            console.log(error);
            if (error.message === 'This financial institution is inactive') {
                Error('This financial institution is inactive');
            } else {
                Error('Failed to authenticate the metamask user!');
            }
        }
    }, [apiInstance]);

    const getFIDetail = useCallback(async(id) => {
        try {
            const res = await apiInstance.getFIDetails(id);
            assert(
                typeof id === 'string',
                'Invalid argument: id must be strings'
            );
            return res;
        } catch (error) {
            throw error;
        }
    }, [apiInstance]);

    const handleAdminPagination = useCallback(async(
        pageNo, fetchedData, totalPageNumber) => {
            assert(
                typeof pageNo === 'number',
                'Invalid argument: pageNo must be a number'
            );
            assert(
                fetchedData instanceof FetchedDataType,
                'Invalid argument: fechedData must be FetchedDataType object'
            );
            assert(
                typeof totalPageNumber === 'number',
                'Invalid argument: TotalPageNumber must be a number'
            );
            if (!fetchedData[pageNo]) {
                try {
                    setListLoading(true);
                    const res = await apiInstance.AllFI(pageNo);
                    const nextData = res[1].map((i) => ({...i}));
                    dispatch(setFetchedData({ pageNo: pageNo + "", data: nextData}));
                    dispatch(
                        setData({
                            data: nextData,
                            TotalPage: +res[0].toString(),
                            currentPage: pageNo,
                        })
                    );
                } catch (error) {
                    console.log(error);
                    Error(
                        error.message.includes('This Financial Insitution is not avtive')
                        ? 'This Financial Insitution is deactiveted by admin, please contract for more info'
                        : 'Error while fetching Financial Insitution list'
                    );
                } finally {
                    setListLoading(false);
                }
            } else {
                if (fetchedData[pageNo].length === 0) {
                    dispatch(
                        setData({
                            data: fetchedData[pageNo],
                            totalPages: totalPageNumber,
                            currentPage: pageNo 
                        })
                    );
                }
            }
        }, [apiInstance, dispatch]
    );

    const handleFIPagination = useCallback(async(
        pageNo, fetchedData, totalPageNumber) => {
            assert(
                typeof pageNo === 'number',
                'Invalid argument: pageNo must be a number'
            );
            assert(
                fetchedData instanceof FetchedDataType,
                'Invalid argument: fechedData must be FetchedDataType object'
            );
            assert(
                typeof totalPageNumber === 'number',
                'Invalid argument: TotalPageNumber must be a number'
            );
            if (!fetchedData[pageNo]) {
                try {
                    setListLoading(true);
                    const res = await apiInstance.getClientofFI(pageNo);
                    dispatch(setFetchedData({ pageNo: pageNo + "", data: res[1]}));
                    dispatch(
                        setData({
                            data: res[1],
                            TotalPage: +res[0].toString(),
                            currentPage: pageNo,
                        })
                    );
                } catch (error) {
                    console.log(error);
                    Error('Error while fetching client data');
                } finally {
                    setListLoading(false);
                }
            } else {
                if (fetchedData[pageNo].length === 0) {
                    dispatch(
                        setData({
                            data: fetchedData[pageNo],
                            totalPages: totalPageNumber,
                            currentPage: pageNo 
                        })
                    );
                }
            }
        }, [apiInstance, dispatch]
    );
    
    const handleClientPagination = useCallback(async(
        pageNo, fetchedData, totalPageNumber) => {
            assert(
                typeof pageNo === 'number',
                'Invalid argument: pageNo must be a number'
            );
            assert(
                fetchedData instanceof FetchedDataType,
                'Invalid argument: fechedData must be FetchedDataType object'
            );
            assert(
                typeof totalPageNumber === 'number',
                'Invalid argument: TotalPageNumber must be a number'
            );
            if (!fetchedData[pageNo]) {
                try {
                    setListLoading(true);
                    const res = await apiInstance.FIrequest(pageNo);
                    dispatch(setFetchedData({ pageNo: pageNo + "", data: res[1]}));
                    dispatch(
                        setData({
                            data: res[1],
                            TotalPage: +res[0].toString(),
                            currentPage: pageNo,
                        })
                    );
                } catch (error) {
                    console.log(error);
                    Error('Error while fetching KYC requests');
                } finally {
                    setListLoading(false);
                }
            } else {
                if (fetchedData[pageNo].length === 0) {
                    dispatch(
                        setData({
                            data: fetchedData[pageNo],
                            totalPages: totalPageNumber,
                            currentPage: pageNo 
                        })
                    );
                }
            }
        }, [apiInstance, dispatch]
    );

    return {
        getAllFiList,
        getFIList,
        getFIDetail,
        getFIKycRequest,
        AddFI,
        updateTheFI,
        toggleBankStates,
        gettheClientDetial,
        addKycRequest,
        RequesttKYCAgain,
        updateKYCVerification,
        searcForClient,
        actionOnKYCRequest,
        updateClientProfile,
        updateDataHash,
        removeKycPremission,
        searchForFI,
        getUserDetails,
        handleAdminPagination,
        handleFIPagination,
        handleClientPagination,
        listLodaing
    };
}