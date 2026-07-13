import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

          <button className="rounded-full p-2 hover:bg-gray-100">
            <FaUserCircle className="text-2xl text-gray-700" />
          </button>
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
          <div className="flex flex-col p-4 space-y-3">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
