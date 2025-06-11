import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import SignIn from './Components/SignIn';
import Applynow from './Components/Applynow';
import AboutUs from './Components/AboutUs';
import ForgotPassword from './Components/forgotpassword';
import EmployeeHomepage from './Components/Employeehomepage';
import Adminpage from './Components/Adminpage';
import ProtectedRoute from './Components/ProtectedRoute';
import ExploreMore from './Components/Exploremore';
import Adminverification from './Components/adminverification';
import Adminusers from './Admin/Adminusers';
import UpdateEmployee from './Admin/UpdateEmployee';
import Addemployee from './Admin/Addemployee';
import Sendmsg from './Admin/Sendmsg';
import './App.css';

function AppRoutes() {
  const location = useLocation();

  // List of exact routes where header should be hidden
  const exactHideHeaderRoutes = [
    '/exploremore',
    '/employeehome',
    '/adminpage',
    '/forgotpassword',
    '/adminverification',
    '/adminusers'
  ];

  const isExactMatch = exactHideHeaderRoutes.includes(location.pathname);

  const isUpdateUserRoute = location.pathname.startsWith('/updateuser/');
  const isAddemployeeRoute = location.pathname.startsWith('/addemployee');
  const isSendmsgRoute = location.pathname.startsWith('/sendmessage')

  // Decide if header should be hidden
  const shouldHideHeader = isExactMatch || isUpdateUserRoute || isAddemployeeRoute|| isSendmsgRoute;

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/applynow" element={<Applynow />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/exploremore" element={<ExploreMore />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/employeehome" element={<EmployeeHomepage />} />
          <Route path="/adminpage" element={<Adminpage />} />
          <Route path="/adminverification" element={<Adminverification />} />
        </Route>

        <Route path="/adminusers" element={<Adminusers />} />
        <Route path="/updateuser/:id" element={<UpdateEmployee />} />
        <Route path='/addemployee' element={<Addemployee/>}/>
        <Route path='/sendmessage' element={<Sendmsg/>}/>

      </Routes>
    </>
  );
}

export default AppRoutes;
