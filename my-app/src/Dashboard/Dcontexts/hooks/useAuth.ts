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
import {useAPI} from './useAPI'
import {useLocation, useNavigate} from 'react-router-dom';



let web3: Web3 | undefined = undefined;

export function useAuth() {
  const {dispatch} = useAuthContext();
  const navigate = useNavigate();
  const state = useLocation();
  const {getUserDetails} = useAPI()

  const connect = useCallback(async function handleLongIn() {
    try {
      if(!window.ethereum) {
        Error('Please install MetaMask!');
        return;
      }
      if (!web3){
        try {
          await window.ethereum.enable()
          web3 = new Web3(window.ethereum);
        } catch (error) {
          Error("Please allow MetaMask");
          return;
        }
      }
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
      if (accounts.length !==0) {
        console.log("Connected", accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        const publceAddress = accounts[0];
        if (publceAddress !=="") {
            const data = await getUserDetails();
            console.log(data)
            if (data) {
              dispatch(
                setUserDetails({
                  status: data.status,
                  email: data.email,
                  ID: data.ID,
                  name: data.name,
                  position: data.position
                })
              );
              dispatch(setLoginStatus(true));
              navigate((state.state as any)?.from || './Dashboard')
            }
          }
        } else {
          Error('account has not found')
        }
      } catch (error) {
        console.log(error);
        Error("Error while trying to login");
      }
    }, [dispatch, getUserDetails, navigate, state.state]
  );

  const getAccounts = useCallback(async function getAccounts() {
    try{
      dispatch(setLoading(true));
      if (!web3) {
        web3 = new Web3(window.ethereum);
        const accounts = await web3?.eth.getAccounts();
        if (accounts.length !== 0) {
          const data = await getUserDetails();
            if (data) {
              dispatch(
                setUserDetails({
                  status: data.status,
                  email: data.email,
                  ID: data.ID,
                  name: data.name,
                  position: data.position,
                })
              );
              dispatch(setLoginStatus(true));
              dispatch(setLoading(false));
              navigate((state.state as any)?.from || "/Dashboard");
            }
          }
        }
      } catch (error) {
        console.log(error);
        Error('Error while trying to retrive your account');
      } finally {
        dispatch(setLoading(false));
      }
    }, [dispatch, getUserDetails, navigate, state.state]
  );

  const disConnect = useCallback(async () => {
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

export default useAuth;


  
  

  


