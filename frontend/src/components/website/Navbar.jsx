import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/auth-context";
import { logout } from "../../api/auth.api";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(["login-profile"]);

  const { isAuthenticated, setAuthenticated } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const outside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", outside);

    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const handleLogout = async () => {
    await logout();

    queryClient.removeQueries({
      queryKey: ["login-profile"],
    });

    setAuthenticated(false);

    setProfileOpen(false);

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EMS
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <FaUserCircle className="text-4xl text-gray-700" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl border bg-white shadow-xl">
                <ProfileMenu
                  profile={profile}
                  isAuthenticated={isAuthenticated}
                  closeMenu={() => setProfileOpen(false)}
                  onLogout={handleLogout}
                />
              </div>
            )}
          </div>
        </div>

        <button
          className="text-2xl md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-white p-5 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
