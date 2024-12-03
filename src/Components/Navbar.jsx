import React from 'react'
import { Link, NavLink, useLoaderData } from 'react-router';
import {  FaHome, FaPlus, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaUser, FaCog, FaSignOutAlt, FaList } from 'react-icons/fa';
import NavbarAvatar from './NavbarAvatar';
// import logoImage from '../assets/logo.png'
import { useFirebaseAuth } from '../Providers/AuthProvider';

export const Navbar = () => {

  const {user, signOutUser } = useFirebaseAuth();

  const userSignOut =()=>{
    signOutUser();

  }

  const getNavLinkClasses = (isActive) =>
    `flex items-center gap-2 px-4 py-2  transition-all duration-100 ${
      isActive
        ? "border-b-2 border-black rounded-none text-black"
        : "text-gray-600  hover:text-black hover:scale-105"
    }`;
  
  const links = (
    <>
     
      {[
         { to: "/", icon: <FaHome />, label: "Home" },
        { to: "/addSchedule", icon: <FaPlus />, label: "Add Schedule" },
        { to: "/allSchedule", icon: <FaList />, label: "All Schedule" },
        { to: "/about", icon: <FaInfoCircle />, label: "About" },
        { to: "/contact", icon: <FaEnvelope />, label: "Contact" },
      
      ].map(({ to, icon, label }) => (
        <li key={to}>
          <NavLink to={to} className={({ isActive }) => getNavLinkClasses(isActive)}>
            {icon} {label}
          </NavLink>
        </li>
      ))}

    



         {!user && <li >
          <NavLink to={"/signin"} className={({ isActive }) => `${getNavLinkClasses(isActive)} block md:hidden `}>
            <FaSignInAlt /> Login+
          </NavLink>
         </li> }


         {user && <li >
          <NavLink onClick={userSignOut} className={({ isActive }) => `${getNavLinkClasses(isActive)} block md:hidden `}>
            <FaSignInAlt /> Logout
          </NavLink>
         </li> }

        
         
         {!user && <li >
          <NavLink to={"/signup"} className={({ isActive }) => `${getNavLinkClasses(isActive)} block md:hidden `}>
           <FaUserPlus /> Register
          </NavLink>
        </li> }
    </>
  );
  
  

  return (
    <div className=' bg-base-100'> 
      <div className="navbar md:w-10/12 mx-auto">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         {
          links
         }
        </ul>
      </div>
     <Link to={"/"} className='flex justify-center items-center '>
     <img src={""} className='w-12 h-12 items-center flex justify-center' alt="" />
     <p className='text-2xl md:text-3xl text-black font-bold '>GymHour</p>
     </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="flex gap-2 px-1">
        {
          links
        }
      </ul>
    </div>
    <div className="navbar-end gap-2">
   <NavbarAvatar  getNavLinkClasses={ getNavLinkClasses}></NavbarAvatar>

{   !user && <Link  to="/signin" className=' hover:text-white transition-all  text-md  border-2 border-black text-black px-3  py-2 rounded-2xl  hover:bg-black hidden md:block'>
      Login
    </Link>}

{ user &&   <button onClick={userSignOut}  to="/signin" className=' hover:text-white transition-all  text-md  border-2 border-black text-black px-3  py-2 rounded-2xl  hover:bg-black hidden md:block'>
      Logout
    </button>}

   { !user && <Link to={"/signup"} className=' hover:text-white transition-all  text-md border-2 border-black text-black  px-3 py-2 rounded-2xl  hover:bg-black  hidden md:block'>
      Register
    </Link>}
    </div>
  </div>
    </div>
  )
}



