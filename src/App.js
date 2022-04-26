import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import PrivateRoute from './components/PrivateRoute'
import Questions2 from './pages/Questions2'
import Questions from './pages/Questions'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateListing from './pages/CreateListing'
import Navbar from './components/Navbar'
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Questions2 />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/create' element={<CreateListing />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  )
}
