import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBuilding,
  FaUsers,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    icon: <FaChartPie />,
    path: "/super-admin/dashboard",
  },
  {
    name: "Companies",
    icon: <FaBuilding />,
    path: "/super-admin/companies",
  },
  {
    name: "Employees",
    icon: <FaUsers />,
    path: "/super-admin/employees",
  },
  {
    name: "Reports",
    icon: <FaClipboardList />,
    path: "/super-admin/reports",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/super-admin/settings/profile",
  },
];

const Sidebar = ({ setSidebarOpen }) => {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-slate-700 px-5 sm:h-20 sm:px-6">
        <h2 className="truncate text-xl font-bold sm:text-2xl">EMS Admin</h2>{" "}
        <span
          className="ml-auto text-slate-400 cursor-pointer text-lg md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          x
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="flex flex-col gap-2">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-lg
                px-4 py-3 text-sm font-medium transition-colors
                duration-200 sm:text-base
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="shrink-0 text-lg">{menu.icon}</span>
              <span className="truncate">{menu.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-700 px-4 py-3">
        <p className="text-center text-xs text-slate-400">EMS Admin Panel</p>
      </div>
    </aside>
  );
};

export default Sidebar;
