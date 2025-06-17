import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import {
  logoutBusiness,
  setBusiness,
} from "../features/business/businessSlice";
import { logoutUser } from "../features/users/userSlice";
import businessService from "../features/business/businessService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { business } = useSelector((state) => state.business || {});
  const { user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser());
      localStorage.removeItem("myUser");
      toast.success("Partner logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (business) {
      dispatch(logoutBusiness());
      businessService.logoutBusiness();
      toast.success("Business logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    navigate("/");
    if (isOpen) toggleMenu();
  };

  // Restore business state from localStorage on mount
  useEffect(() => {
    try {
      const storedBusiness = JSON.parse(localStorage.getItem("business"));
      if (
        storedBusiness &&
        storedBusiness._id &&
        storedBusiness.businessName &&
        storedBusiness.email &&
        storedBusiness.token
      ) {
        dispatch(setBusiness(storedBusiness));
      }
    } catch (error) {
      console.error("Failed to parse business from localStorage:", error);
      localStorage.removeItem("business");
    }
  }, [dispatch]);

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700"
          : "bg-gradient-to-r from-blue-100 to-teal-50 border-b border-teal-100"
      } shadow-lg px-6 py-4`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 object-contain transition-transform duration-500 hover:rotate-12 hover:scale-110"
          />
          <span
            className={`text-2xl font-extrabold tracking-tight ${
              isDarkMode ? "text-teal-300" : "text-teal-700"
            }`}
          >
            Referra
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-semibold text-base items-center">
          {["/", "/About", "/Faqs"].map((path, i) => {
            const label = ["Home", "About Us", "FAQ'S"][i];
            return (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  isActive
                    ? `${
                        isDarkMode ? "text-teal-500" : "text-teal-800"
                      } transition-all duration-300 transform relative group`
                    : `${
                        isDarkMode
                          ? "text-gray-300 hover:text-teal-500"
                          : "text-gray-700 hover:text-teal-600"
                      } transition-all duration-300 transform hover:-translate-y-1 relative group`
                }
              >
                {label}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-0.5 ${
                    isDarkMode ? "bg-teal-100" : "bg-teal-800"
                  } transition-all duration-300 group-hover:w-full`}
                ></span>
              </NavLink>
            );
          })}

          {/* Explore Offers Toggle - Only for regular users */}
          {user && !business && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-1 font-semibold transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-teal-500"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                Explore Offers
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white text-gray-800 shadow-lg mt-2 rounded-lg py-2 w-48 z-50">
                  <NavLink
                    to="/offers/health"
                    className="block px-4 py-2 hover:bg-teal-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Health Offers
                  </NavLink>
                  <NavLink
                    to="/offers/finance"
                    className="block px-4 py-2 hover:bg-teal-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Finance Offers
                  </NavLink>
                  <NavLink
                    to="/offers/legal"
                    className="block px-4 py-2 hover:bg-teal-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Legal Offers
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "bg-gray-700 text-teal-300 hover:bg-gray-600"
                : "bg-teal-100 text-teal-700 hover:bg-teal-200"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user || business ? (
            <>
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-teal-300" : "text-teal-700"
                }`}
              >
                {user ? user.username : business.businessName}
              </span>
              <button
                onClick={handleLogout}
                className={`bg-gradient-to-r ${
                  isDarkMode
                    ? "from-red-600 to-red-700"
                    : "from-red-500 to-red-600"
                } text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink
              to="/loginButton"
              className={`bg-gradient-to-r ${
                isDarkMode
                  ? "from-teal-600 to-blue-700"
                  : "from-teal-500 to-blue-600"
              } text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
            >
              LOGIN
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`${
              isDarkMode
                ? "text-teal-300 hover:text-teal-500"
                : "text-teal-600 hover:text-teal-800"
            } transition-colors`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden mt-4 space-y-4 px-4 py-6 rounded-xl shadow-2xl backdrop-blur-lg ${
            isDarkMode ? "bg-gray-800 bg-opacity-80" : "bg-white bg-opacity-80"
          } border ${isDarkMode ? "border-gray-700" : "border-teal-100"}`}
        >
          {[
            { label: "Home", path: "/" },
            { label: "About Us", path: "/About" },
            { label: "FAQ'S", path: "/Faqs" },
            ...(user && !business
              ? [
                  { label: "Health Offers", path: "/offers/health" },
                  { label: "Finance Offers", path: "/offers/finance" },
                  { label: "Legal Offers", path: "/offers/legal" },
                ]
              : []),
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? `block px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "text-teal-100 bg-gray-700"
                        : "text-teal-800 bg-teal-50"
                    } transition-colors`
                  : `block px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-teal-50"
                    } transition-colors`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Dark mode + Auth buttons (Mobile) */}
          <div className="flex items-center space-x-4 px-4 mt-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-gray-700 text-teal-300 hover:bg-gray-600"
                  : "bg-teal-100 text-teal-700 hover:bg-teal-200"
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user || business ? (
              <>
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-teal-300" : "text-teal-700"
                  }`}
                >
                  {user ? user.username : business.businessName}
                </span>
                <button
                  onClick={handleLogout}
                  className={`flex-1 bg-gradient-to-r ${
                    isDarkMode
                      ? "from-red-600 to-red-700"
                      : "from-red-500 to-red-600"
                  } text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={`flex-1 bg-gradient-to-r ${
                  isDarkMode
                    ? "from-teal-600 to-blue-700"
                    : "from-teal-500 to-blue-600"
                } text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                LOGIN
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
