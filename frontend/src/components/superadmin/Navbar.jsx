import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { logout } from "../../api/auth.api";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const queryClient = useQueryClient();
  const { authLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      queryClient.removeQueries({
        queryKey: ["login-profile"],
      });

      authLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between gap-3 border-b bg-white px-3 shadow-sm sm:px-5 md:px-6">
      {/* Left Section */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Sidebar Toggle - Mobile */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="shrink-0 rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Search */}
        <div className="relative min-w-0 flex-1 sm:max-w-xs md:max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500 sm:text-base"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100"
        >
          <FaBell size={18} />
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border border-white bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FaUserCircle size={30} className="shrink-0 text-gray-600" />

          <div className="hidden sm:block">
            <h4 className="whitespace-nowrap text-sm font-semibold md:text-base">
              Super Admin
            </h4>
            <p className="text-xs text-gray-500 md:text-sm">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
