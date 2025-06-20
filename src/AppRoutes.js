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
import Providetask from './Admin/Providetask';
import SendNotification from './Admin/SendNotification';
import Viewtasks from './Employee/Viewtasks';
import Addtask from './Admin/Addtasks';
import Meetingpage from './Admin/Meetingpage';
import Schedulemeeting from './Admin/Schedulemeeting';
import Schedulemeet from './Employee/Schedulemeet';
import Commcoll from './Employee/Commcoll';
import ProfilePage from './Components/Profilepage';
import Myappli from './Employee/Myappli';
import Applicationmanag from './Admin/Applimanage';
import Analytics from './Admin/Analytics';
import './App.css';

function AppRoutes() {
  const location = useLocation();

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
  const isSendmsgRoute = location.pathname.startsWith('/sendmessage');
  const isSendnotiRoute = location.pathname.startsWith('/sendnotification');
  const isProvidetaskRoute = location.pathname.startsWith('/providetask');
  const isAddtask = location.pathname.startsWith('/addtask');
  const isviewtask = location.pathname.startsWith('/viewtask');
  const ismeetingpage = location.pathname.startsWith('/meeting');
  const isschedulemeeting = location.pathname.startsWith('/schedulemeeting');
  const iscommcoll = location.pathname.startsWith('/commcoll');
  const isschedulemeet = location.pathname.startsWith('/schedulemeet');
  const isprofilepage = location.pathname.startsWith('/profile');
  const ismyappli = location.pathname.startsWith('/myappli');
  const isapplimanage = location.pathname.startsWith('/applicationmanage');
  const isanalytics = location.pathname.startsWith('/analytics');

  const shouldHideHeader = isExactMatch || isUpdateUserRoute || isAddemployeeRoute || isSendmsgRoute || isSendnotiRoute ||
    isProvidetaskRoute || isAddtask || isviewtask || ismeetingpage || isschedulemeeting || iscommcoll || isschedulemeet || isprofilepage
    || isapplimanage || isanalytics || ismyappli;

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
        <Route path='/addemployee' element={<Addemployee />} />
        <Route path='/sendmessage' element={<Sendmsg />} />
        <Route path='/sendnotification' element={<SendNotification />} />
        <Route path='/providetask' element={<Providetask />} />
        <Route path='/addtask' element={<Addtask />} />
        <Route path='/viewtask' element={<Viewtasks />} />
        <Route path='/meeting' element={<Meetingpage />} />
        <Route path='/schedulemeeting' element={<Schedulemeeting />} />
        <Route path='/commcoll' element={<Commcoll />} />
        <Route path='/schedulemeet' element={<Schedulemeet />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/myappli' element={<Myappli />} />
        <Route path='/applicationmanage' element={<Applicationmanag />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
