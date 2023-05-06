import { useCallback, useState } from "react";
import { setData, setFetchedData, useAuthContext} from '../../../Context/auth-context';
import { FetchedDataType } from "../../../Context/auth-context/types"; 
import { FI, FIStatus, Client, KycServices, User } from "../../../Repo";
import { Success, Error } from "../../../unities";

const rejectErrorCheck = (error: any) => 
error.message.includes("User deiend trasaction signature");

export function useAPI() {
    const { dispatch } = useAuthContext();
    const apiInstance = KycServices.getInstance();
    const [listLodaing, setListLoading] = useState(false);
    
    const getFIList = useCallback(async (currentPage: number) => {
        try {
            setListLoading(true);
            const res = await apiInstance.AllFI(currentPage);
            const data = res[1].filter((i) => ({...i}));
            dispatch(setData({ data, totalPages: +res[0].toString(), currentPage }));
            dispatch(setFetchedData({ pageNo: currentPage + "", data }));
        } catch (error) {
            console.log(error);
            Error("Error while fetchinh Financial list");
        } finally {
            setListLoading(false);
        }
    }, [apiInstance, dispatch]);

    const AddFI = useCallback(async(details: FI) => {
        try {
            const data = await apiInstance.AddFIAccount(details);
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

    const updateTheFI = useCallback (
        async(updatedDetails: {id: string, email: string, name: string}) => {
        try {
            const data = await apiInstance.FIUpdate(updatedDetails);
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

    const toggleBankStates = useCallback (async(id: string, status: boolean) => {
        try {
            const data = await apiInstance.ActiveteandDeactivete(id, status);
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

    const getAllFiList = useCallback(async(currentPage: number) => {
        try {
            setListLoading(true);
            const res = await apiInstance.getClientofFI(currentPage);
            console.log(res);
            dispatch(
                setData({
                    data: res[1],
                    totalPages: +res[0].toString(),
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

    const gettheClientDetial = useCallback (async(id: string) => {
        try {
            const data = await apiInstance.gettheClientDetials(id);
            return data;
        } catch (error) {
            console.log(error);
            Error("Error while fetching client details");
        }
    }, [apiInstance]);

    const addKycRequest = useCallback(
        async(data: {client: Client; time: number; note: string;}) => {
        try {
            const res = await apiInstance.AddKYC(
                data.client,
                data.time,
                data.note
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

    const RequesttKYCAgain = useCallback(
        async(id: string, note: string) => {
        try {
            const res = await apiInstance.reKYC(id, note);
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

    const updateKYCVerification = useCallback(
        async(data: {id: string; isVerified: boolean; note: string;  }) => {
        try {
            const res = await apiInstance.KYCVerification(data);
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

    const searcForClient = useCallback(async(id: string) => {
        try {
            const res = await apiInstance.searchClient(id);
            return res;
        } catch (error) {
            console.log(error);
            Error('Error while searching client');
        }
    }, [apiInstance]);

    /* Client Functions */

    const getFIKycRequest = useCallback(async(currentPage: number) => {
        try {
            console.log('Financial Insitutions list request');
            setListLoading(true);
            const res = await apiInstance.FIrequest(currentPage);
            const data = res[1];
            dispatch(setData({data, totalPages: +res[0].toString(), currentPage}));
            dispatch(setFetchedData({ pageNo: currentPage + "", data }));
        } catch (error) {
            console.log(error);
            Error('Error while feching client of financial institution list');
        } finally {
            setListLoading(false);
        }
    }, [apiInstance, dispatch]);

    const actionOnKYCRequest = useCallback(
        async(fiId: string, isApproved: boolean, note: string) => {
            console.log(isApproved, "approval status");
            try {
                const res = await apiInstance.KYCaction(
                    fiId,
                    isApproved,
                    note
                );
                console.log(res);
                Success("Data has sent to  you financial insitution");
                return res
            } catch (error:any) {
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

    const updateClientProfile = useCallback(
        async (name: string, email: string, number:string) => {
        try {
            const res = await apiInstance.updateProfile(name, email, number);
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

    const updateDataHash = useCallback(async(hash: string) => {
        try{
            const res = await apiInstance.updateHash(hash);
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

    const removeKycPremission = useCallback(async(id: string, note:string) => {
        try {
            const res = await apiInstance.removePremission(id, note);
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

    const searchForFI = useCallback(async(id: string) => {
        try {
            const res = await apiInstance.searchforFI(id);
            const formatedData = {isFi: res[1], FiDetails: res[2]};
            return formatedData
        } catch (error:any) {
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

    const getUserDetails = useCallback(async(): Promise<User | undefined> =>  {
        try {
            const res = await apiInstance.getUserInfo()
            console.log(res);
            if(res.status === FIStatus.Inactive) {
                throw Error("This financial institution is inactive");
            }
            return res;
        } catch (error) {
            console.log(error);
            if (error === 'This financial institution is inactive') {
                Error('This financial institution is inactive');
            } else {
                Error('Failed to authenticate the metamask user!');
            }
        }
    }, [apiInstance]);

    const getFIDetail = useCallback(async(ID: string) => {
        try {
            const res = await apiInstance.getFIDetails(ID);
            return res;
        } catch (error) {
            throw error;
        }
    }, [apiInstance]);

    const handleAdminPagination = useCallback(
        async(
            pageNo: number, 
            fetchedData: FetchedDataType, 
            totalPageNumber: number
        ) => {
                if (!fetchedData[pageNo]) {
                    try {
                        setListLoading(true);
                        const res = await apiInstance.AllFI(pageNo);
                        const nextData = res[1].map((i) => ({...i}));
                        dispatch(setFetchedData({ pageNo: pageNo + "", data: nextData}));
                        dispatch(
                            setData({
                                data: nextData,
                                totalPages: +res[0].toString(),
                                currentPage: pageNo,
                            })
                        );
                    } catch (error:any) {
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

    const handleFIPagination = useCallback(
        async(
            pageNo: number, 
            fetchedData: FetchedDataType, 
            totalPageNumber: number
        ) => {
                if (!fetchedData[pageNo]) {
                    try {
                        setListLoading(true);
                        const res = await apiInstance.getClientofFI(pageNo);
                        dispatch(setFetchedData({ pageNo: pageNo + "", data: res[1]}));
                        dispatch(
                            setData({
                                data: res[1],
                                totalPages: +res[0].toString(),
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
    
    const handleClientPagination = useCallback(
        async(
            pageNo: number, 
            fetchedData: FetchedDataType, 
            totalPageNumber: number) => {
            if (!fetchedData[pageNo]) {
                try {
                    setListLoading(true);
                    const res = await apiInstance.FIrequest(pageNo);
                    dispatch(setFetchedData({ pageNo: pageNo + "", data: res[1]}));
                    dispatch(
                        setData({
                            data: res[1],
                            totalPages: +res[0].toString(),
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