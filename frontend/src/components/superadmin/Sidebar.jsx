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
    path: "/super-admin/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-2xl font-bold">EMS Admin</h2>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {menu.icon}
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
