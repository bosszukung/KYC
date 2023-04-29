import React, {useState} from 'react';
import './App.css';
import Navbar from './componants/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import About from './pages/About/About' ;
import Admin from './Dashboard/Admin/Admin_Dashboard';
import ADashboard from './Dashboard/Admin/ADashboard';
import LoginButton from './pages/Login/Login';
import APie from './Dashboard/Admin/Acomponents/senes/Pie/APie';
import FIT from './Dashboard/Admin/FIT';
import User from './Dashboard/User/User_Dashboard';
import UDashboard from './Dashboard/User/UDashboard';
import UPie from './Dashboard/User/Ucomponents/senes/Pie/UPie'
import Client from './Dashboard/Client/Client_Dashboard';
import CDashboard from './Dashboard/Client/CDashboard';
import CPie from './Dashboard/Client/Ccomponents/senes/Pie/CPie';


function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <>
    <Router>
      {showNavbar && Navbar()}
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginButton />} />

        {/* <Route element={<PrivateRoute allowedRoles={["Admin"]}></PrivateRoute>}>   */}
          <Route path='/admin' element={<Admin setShowNavbar={setShowNavbar} showNavbar={false} />}>
            <Route path='/admin' element={<ADashboard/>} />
            <Route path='fi' element={<FIT />} />
            <Route path='apie' element={<APie />} />
          </Route>
        {/* </Route>  */}

        {/* <Route element={<PrivateRoute allowedRoles='FI'/>}> */}
          <Route path='/user' element={<User setShowNavbar={setShowNavbar} showNavbar={false} />}>
            <Route path='/user' element={<UDashboard/>} />
            <Route path='upie' element={<UPie />} />
          </Route>
        {/* </Route> */}

        {/* <Route element={<PrivateRoute allowedRoles='Client'/>}> */}
          <Route path='/client' element={<Client setShowNavbar={setShowNavbar} showNavbar={false} />}>
            <Route path='/client' element={<CDashboard/>} />
            <Route path='cpie' element={<CPie />} />
          </Route>
        {/* </Route> */}

      </Routes> 
    </Router>
    </>
  );
}

export default App;
