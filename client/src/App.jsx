import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './pages/home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
const App = () => {
  return (
    <div className='min-h-screen bg-stale-50'>
      <NavBar/>
      {/* <SignInButton/> */}
      <Routes>
        <Route path="/" element = {<Home/>}></Route>
        <Route path="/result" element = {<Result/>}></Route>
        <Route path="/buy" element = {<BuyCredit/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App