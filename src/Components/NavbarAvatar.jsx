import React from 'react'
import { NavLink } from 'react-router'
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const NavbarAvatar = ({ getNavLinkClasses}) => {
  return (
    <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-black">
      <div className="w-10 rounded-full ">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <NavLink to="/profile" className={({ isActive }) => getNavLinkClasses(isActive)}>
          <FaUser /> Profile
          <span className="badge">New</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className={({ isActive }) => getNavLinkClasses(isActive)}>
          <FaCog /> Settings
        </NavLink>
      </li>
      <li>
        <NavLink to="/logout" className={({ isActive }) => getNavLinkClasses(isActive)}>
          <FaSignOutAlt /> Logout
        </NavLink>
      </li>
    </ul>
  </div>
  )
}

export default NavbarAvatar