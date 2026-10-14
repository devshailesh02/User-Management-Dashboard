import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../superadmin/Sidebar";
import Navbar from "../superadmin/Navbar";

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          transform transition-transform duration-300
          md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Right Section */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
