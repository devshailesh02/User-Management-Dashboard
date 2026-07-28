import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/website/Navbar";
import Footer from "../components/website/Footer";

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md">
        <Navbar />
      </header>

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
