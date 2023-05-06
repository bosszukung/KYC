import {useState}from 'react';
import Navbar from '../componants/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/HomePage/Home';
import About from '../pages/About/About' ;
import Admin from '../Dashboard/Admin/Admin_Dashboard';
import Login from '../pages/Login/Login';
import User from '../Dashboard/User/User_Dashboard';
import Client from '../Dashboard/Client/Client_Dashboard';
import PrivateRoute from '../Dashboard/Dcontexts/hooks/privateRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { ProfilePage } from '../pages/Profile/Profile';
import { FIProfilePage } from '../Dashboard/User/Ucomponents/senes/FiProfile';
import { FiDetials } from '../Dashboard/Client/Ccomponents/senes/FiDetail';
import { AddPage as AdminAddPage } from '../Dashboard/Admin/Acomponents/AdminAdd';
import { AddPage } from '../Dashboard/User/Ucomponents/senes/Add';
import { useAuthContext } from '../Context/auth-context';
import { EntiyDetials } from '../pages/Entity';
import Loader from '../componants/loader';
import { Positions } from '../Repo';

export function Rout() {
    const [showNavbar, setShowNavbar] = useState(true);
    const {
      state: {
        userDetails: { position },
        loading,
      },
    } = useAuthContext();
  
    if (loading) {
      return <Loader />;
    }
  
  
    return (
      <>
      <Router>
        {showNavbar && Navbar()}
        <Routes>  
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<ErrorPage/>} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={
              <>
                {position === Positions.Admin && 
                  <Admin setShowNavbar={setShowNavbar} showNavbar={false} />}
                {position === Positions.FI && 
                  <User setShowNavbar={setShowNavbar} showNavbar={false} />}
                {position === Positions.Client && 
                <Client setShowNavbar={setShowNavbar} showNavbar={false} />}
              </>
            } 
            />
            {(position === Positions.Client || position === Positions.FI) && (
              <Route
              path="profile"
              element={
                <>
                  {position === Positions.Client && <ProfilePage />}
                  {position === Positions.FI && <FIProfilePage />}
                </>
              }
              />
            )}
            <Route
              path="/dashboard/add"
              element={<>{position === Positions.FI ? <AddPage /> : <AdminAddPage />}</>}
            />
            <Route
            path="/:id"
            element={
              <>{position === Positions.FI ? <EntiyDetials /> : <FiDetials />}</>
            }
            />
          </Route>
      </Routes> 
    </Router>
    </>
    );
  }
  
  
  export default Routes;