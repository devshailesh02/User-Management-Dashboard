import { Outlet } from "react-router-dom";
import Sidebar from "../superadmin/Sidebar";
import Navbar from "..//superadmin/Navbar";

const SuperAdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
