import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="h-16 bg-white shadow-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyWebsite
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <FaUserCircle className="text-2xl text-gray-700" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg">
                <Link
                  to="/login"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Services
            </Link>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Contact
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
