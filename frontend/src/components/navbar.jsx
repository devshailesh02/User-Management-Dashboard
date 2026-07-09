import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div>logo</div>
      <ul className="nav-items">
        <li>home</li>
        <li>about</li>
        <li>contact</li>
      </ul>
      <div className="hamburger">☰</div>
    </nav>
  );
}

export default Navbar;
