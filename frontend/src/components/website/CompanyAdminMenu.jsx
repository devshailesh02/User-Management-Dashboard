import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const CompanyAdminMenu = ({ profile, closeMenu, onLogout }) => {
  return (
    <>
      <div className="border-b p-4">
        <h3 className="font-semibold">{profile?.name}</h3>

        <p className="text-sm text-gray-500">{profile?.email}</p>

        <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          Company Admin
        </span>
      </div>

      <Link
        to="/admin/dashboard"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaTachometerAlt />
        Dashboard
      </Link>

      <Link
        to="/admin/employees"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaUsers />
        Employees
      </Link>

      <Link
        to="/admin/company-profile"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaBuilding />
        Company Profile
      </Link>

      <Link
        to="/admin/settings"
        onClick={closeMenu}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <FaCog />
        Settings
      </Link>

      <hr />

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </>
  );
};

export default CompanyAdminMenu;
