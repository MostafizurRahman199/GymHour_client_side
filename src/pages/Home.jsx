import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../Components/Navbar'
import StaticSchedule from './StaticSchedule'

const Home = () => {
  return (
    <>
    <Navbar></Navbar>
   
    <Outlet></Outlet>
    </>
  )
}

export default Home