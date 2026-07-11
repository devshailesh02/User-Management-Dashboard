import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">MyWebsite</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Building modern, responsive web applications with React & Tailwind
              CSS.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex justify-center gap-4 sm:justify-start">
              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-pink-600 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-blue-500 hover:text-white"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-gray-700 hover:text-white"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link className="transition hover:text-blue-400" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-blue-400" to="/about">
                  About
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-blue-400" to="/services">
                  Services
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-blue-400" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>

            <ul className="space-y-3">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Mobile Apps</li>
              <li>SEO Optimization</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-3">
              <p>📧 info@mywebsite.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">MyWebsite</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
