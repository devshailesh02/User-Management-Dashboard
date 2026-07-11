import React from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaUsers,
  FaCalendarCheck,
  FaChartBar,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-4xl text-blue-600" />,
    title: "Employee Management",
    description:
      "Manage employee profiles, roles, departments, and personal information from one place.",
  },
  {
    icon: <FaCalendarCheck className="text-4xl text-blue-600" />,
    title: "Attendance Tracking",
    description:
      "Track employee attendance with detailed reports and monthly summaries.",
  },
  {
    icon: <FaChartBar className="text-4xl text-blue-600" />,
    title: "Reports & Analytics",
    description:
      "Get insights into workforce performance through real-time reports.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-blue-600" />,
    title: "Role-Based Access",
    description:
      "Separate access for Super Admin, Company Admin, HR, and Employees.",
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 py-20 lg:flex-row">
        {/* Left */}
        <div className="flex-1 text-center lg:text-left">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Employee Management System
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Manage Your
            <span className="text-blue-600"> Company Workforce</span>
            <br />
            Smarter & Faster
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A complete cloud-based Employee Management System for companies.
            Manage employees, attendance, departments, reports, and much more
            from one powerful dashboard.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/company/register"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Register Company
            </Link>

            <Link
              to="/company/login"
              className="flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Company Login
              <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 justify-center">
          <div className="rounded-3xl bg-white p-10 shadow-2xl">
            <FaBuilding className="mx-auto text-8xl text-blue-600" />

            <h3 className="mt-6 text-center text-2xl font-bold">
              Company Dashboard
            </h3>

            <p className="mt-2 text-center text-gray-600">
              Manage employees, attendance, payroll and reports.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Everything Your Company Needs
            </h2>

            <p className="mt-4 text-gray-600">
              Powerful tools to simplify employee management.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-50 p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {feature.icon}

                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>

                <p className="mt-3 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Get Started in Minutes
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              "Register Company",
              "Create Departments",
              "Add Employees",
              "Manage Everything",
            ].map((step, index) => (
              <div key={index} className="rounded-xl bg-white p-8 shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-lg font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 text-center md:grid-cols-4">
          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-2">Companies</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">25K+</h2>
            <p className="mt-2">Employees</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">1M+</h2>
            <p className="mt-2">Attendance Records</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">99.9%</h2>
            <p className="mt-2">System Uptime</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Manage Your Workforce?
          </h2>

          <p className="mt-5 text-lg text-gray-300">
            Join companies using our Employee Management System to streamline HR
            operations and improve productivity.
          </p>

          <Link
            to="/company/register"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Register Your Company
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
