import { useCallback} from "react";
import { Error } from "../../../unities";
import Web3 from 'web3'
import {
    resetStates,
    setUserDetails,
    setLoading,
    useAuthContext,
    setLoginStatus,
} from '../../../Context';
import { Roles } from "../Roles";
import {useLocation, useNavigate} from 'react-router-dom';

/** @type {Web3 | undefined} */
let web3 = undefined;

export function useAuth() {
  const {dispatch} = useAuthContext();
  const navigate = useNavigate();
  const state = useLocation();

  const connect = useCallback(async function handleLongIn() {
    try {
      if(!window.ethereum) {
        Error('Please install MetaMask!');
        return;
      }
      if (!web3){
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          web3 = new Web3(window.ethereum);
          console.log(window.ethereum)
        } catch (error) {
          Error("Please allow MetaMask");
          return;
        }
      }
      const accounts = await web3.eth.requestAccounts();
      if (accounts.length !==0) {
        console.log("Connected", accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        const publceAddress = accounts[0];
        if (publceAddress !=="") {
            const currentUserRole = Roles.get(publceAddress)
            switch (currentUserRole) {
              case "Admin":
                navigate((state.state)?.from ||"/admin");
                dispatch(setLoginStatus(true));
                break;
              case "FI":
                navigate((state.state)?.from || "/user");
                dispatch(setLoginStatus(true));
                break;
              case "Client":
                navigate((state.state)?.from || "/client");
                dispatch(setLoginStatus(true));
                break;
              default:
                return navigate((state.state)?.from || '/');
            }
          }
        } else {
          Error('account has not found')
        }
      } catch (error) {
        console.log(error);
        Error("Error while trying to login");
      }
    }, [dispatch, navigate, state.state?.from]
  );

  const getAccounts = useCallback(async function getAccounts() {
    try{
      dispatch(setLoading(true));
      if (!web3) {
        web3 = new Web3(window.ethereum);
        const accounts = await web3?.eth.getAccounts();
        if (accounts.length !== 0) {
          const currentUserRole = Roles.get(accounts)
            switch (currentUserRole) {
              case "Admin":
                navigate((state.state)?.from ||"/admin");
                dispatch(setLoginStatus(true));
                dispatch(setUserDetails({ address: accounts, role: currentUserRole }));
                dispatch(setLoading(false));
                break;
              case "FI":
                navigate((state.state)?.from || "/user");
                dispatch(setLoginStatus(true));
                dispatch(setUserDetails({ address: accounts, role: currentUserRole }));
                dispatch(setLoading(false));
                break;
              case "Client":
                navigate((state.state)?.from || "/client");
                dispatch(setLoginStatus(true));
                dispatch(setUserDetails({ address: accounts, role: currentUserRole }));
                dispatch(setLoading(false));
                break;
              default:
                return navigate((state.state)?.from || '/');
            }
          }
        }
      } catch (error) {
        console.log(error);
        Error('Error while trying to retrive your account');
      } finally {
        dispatch(setLoading(false));
      }
    }, [dispatch, navigate, state.state?.from]
  );

  const disConnect = useCallback(async function disConnect() {
    dispatch(resetStates());
    dispatch(setLoginStatus(false));
    console.log(setLoginStatus)
    navigate((state.state)?.from || '/')
  }, [dispatch, navigate, state.state?.from]);

  return {
    connect,
    disConnect,
    getAccounts
  };
}


  
  

  


