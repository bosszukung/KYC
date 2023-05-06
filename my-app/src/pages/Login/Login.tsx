import {useEffect} from "react";
import '../../App.css';
import './Login.css';
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../../Context/auth-context'
import {useAuth} from '../../Dashboard/Dcontexts/hooks/useAuth'
import { Button } from "native-base";


export function Login() {
  let navigate = useNavigate();
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
          <Button
            size="lg"
            bgColor={"darkslategrey"}
            w="150"
            mt="5"
            onPress={() =>
              isUserLoggedIn ? navigate("/dashboard") : connect()
            }>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
};

export default Login;
