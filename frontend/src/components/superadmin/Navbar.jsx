import { FaBell, FaSearch, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../api/auth.api";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/auth-context";

const Navbar = () => {
  const queryClient = useQueryClient();
  const { setAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();

    queryClient.removeQueries({
      queryKey: ["login-profile"],
    });

    setAuthenticated(false);

    navigate("/");
  };
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Search */}
      <div className="relative w-96">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell size={20} />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle size={34} className="text-gray-600" />

          <div>
            <h4 className="font-semibold">Super Admin</h4>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        <button className="text-red-600 hover:text-red-700" onClick={logout}>
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
