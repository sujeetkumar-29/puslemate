import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-4 md:px-8 relative z-30">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.pmlogo}
        alt="logo"
        className="w-44 cursor-pointer"
      />

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
        {['/', '/doctors', '/about', '/contact'].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            className={({ isActive }) =>
              `py-1 hover:text-primary ${isActive ? 'text-primary border-b-2 border-primary' : ''}`
            }
          >
            {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
          </NavLink>
        ))}
      </ul>

      {/* Profile / Login / Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        {token ? (
          <div
            className="relative group cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="flex items-center gap-2">
              <img
                src={assets.profile_pic}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <img src={assets.dropdown_icon} alt="dropdown" className="w-3" />
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 bg-white border border-gray-300 shadow-md rounded-lg w-48 p-4 z-50">
                <p
                  onClick={() => {
                    navigate('/my-profile');
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black text-gray-600 py-1"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/my-appointments');
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black text-gray-600 py-1"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-red-600 text-gray-600 py-1"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:bg-opacity-90 transition"
          >
            Create Account
          </button>
        )}

        {/* Hamburger */}
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-6 h-6 cursor-pointer md:hidden"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <img className="w-36" src={assets.pmlogo} alt="logo" />
          <img
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <ul className="flex flex-col items-start px-5 gap-4 font-medium text-gray-800 mt-4">
          {['/', '/doctors', '/about', '/contact'].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `w-full py-2 px-2 rounded hover:bg-gray-100 ${
                  isActive ? 'text-white bg-cyan-900 font-semibold' : ''
                }`
              }
            >
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </NavLink>
          ))}
        </ul>
        {!token && (
          <button
            onClick={() => {
              navigate('/login');
              setShowMenu(false);
            }}
            className="bg-primary text-white mx-5 mt-6 px-6 py-2 rounded-full w-full text-sm hover:bg-opacity-90"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
