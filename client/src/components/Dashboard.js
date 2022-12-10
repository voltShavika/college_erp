import React, { useContext } from 'react'
import CollegeContext from '../Context/CollegeContext'
import {Navigate} from 'react-router-dom';

import Navbar from './Navbar';
import StudentProfile from './StudentProfile';
import StaffProfile from './StaffProfile';

export default function Dashboard() {
  const {loginStatus, user} = useContext(CollegeContext);

  return (
    <>
      {
        (!loginStatus) && <Navigate to="/" />
      }
      <Navbar/>
      {
        user && user.userType == 'Staff' && <StaffProfile/>
      }
      {
        user && user.userType == 'Student' && <StudentProfile/>
      }
      
    </>
  )
}
