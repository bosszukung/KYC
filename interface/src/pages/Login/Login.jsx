import React, {/*useState*/ useEffect} from "react";
import '../../App.css';
import './Login.css';
import { Roles } from "../../Dashboard/Dcontexts/Roles";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../../Context'
import { useAuth } from "../../Dashboard/Dcontexts/hooks/useAuth";
import { Button } from "../../componants/Button";
import { Positions } from "../../Repo";
import { Error } from "../../unities";

function Login() {
  const navigate = useNavigate();
  const {
    state: {isUserLoggedIn},
  } = useAuthContext();
  const {connect, getAccounts } = useAuth();
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);
  


  return(
    <div>
      <div className="login">
        <div className="login-container">
          <h1>Log In</h1>
          <Button onClick={() => {
            console.log()
            if (isUserLoggedIn) {
              const currentUserRole = Roles.get(getAccounts()[0]);
              switch(currentUserRole) {
                case Positions.Admin:
                  navigate('/admin');
                  break;
                case Positions.FI:
                  navigate('/user');
                  break;
                case Positions.Client:
                  navigate('/client');
                  break;
                  default:
                    const errorMessage = `Unknown user role: ${currentUserRole}`;
                    return <Error message={errorMessage} />;
              }
            } else {
              connect()
            }
          }} 
          className="btns" 
          buttonstyle='btn--outline' 
          buttonsize='button--lagre'
          >
            <h1 className="log">SUBMIT</h1>
          </Button>
        </div>
      </div>
    </div>
  )
};

export default Login;







//  function LoginButton() {
//    const [address, setAddress] = useState('');
//    const [redirectUrl, setRedirectUrl] = useState('');
//    const navigate = useNavigate();

//    async function requestAccount() {
//      console.log('Requesting account...');
//      if(window.ethereum) {
//        console.log('MetaMask detected');
//        try {
//          const accounts = await window.ethereum.request({
//            method: "eth_requestAccounts",
//          });
//          setAddress(accounts[0])
//        } catch (error) {
//          alert('Error connecting to MetaMask');
//        }
//      } else {
//        alert('MetaMask not detected');
//      }
//    }
//    const connectWallet = async () => {
//      if (typeof window.ethereum !== "undefined") {
//        await requestAccount();
//        const provider = new ethers.providers.Web3Provider(
//          window.ethereum);
//        const signer = provider.getSigner();  //eslint-disable-next-line 
//        const address = await signer.getAddress();
//        const userRole = await Roles.get(address); 

//          if (userRole && userRole === 'Admin') {
//            setRedirectUrl("/admin");
//          } else if (userRole && userRole === 'Bank') {
//            setRedirectUrl("/user");
//          } else if (userRole && userRole === 'Client') {
//            setRedirectUrl("/client");
//          } else {
//            alert('You do not have access to this application');
//          }

//          window.ethereum.on("accountsChanged", (accounts) => {
//            if (accounts.length === 0) {
//              setAddress('');
//              setRedirectUrl('/login');
//              navigate('/login');
//            } else if (accounts[0] !== address) {
//              setAddress('');
//              setRedirectUrl('/login');
//              navigate('/login');
//            }
//          });
//      }
//    };

//    if (redirectUrl) {
//      navigate(redirectUrl);
//    }

//    return(
//      <>
//        <div className="login">
//          <div className="login-container">
//            <h1>Log In</h1>
//            <div className="submit-btn">
//              <button onClick={connectWallet} className='submit-btns'>
//                <h1 className="submit">SUBMIT</h1>
//              </button>
//              <p>Logged in as {address}</p>
//            </div>
//          </div>
//        </div>
//      </>
//    )
//  };
   
//  export default LoginButton;