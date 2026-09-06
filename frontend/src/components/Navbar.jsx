import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  User,
  LogOut,
  Upload,
  Bookmark,
  FileText,
  Settings,
  Shield,
  ChevronDown,
  Donut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 text-2xl font-bold text-slate-900"
          onClick={() => setMobileOpen(false)}
        >
          dbt<span className="text-blue-600">Papers</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/repository"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Repository
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/upload"
                className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
              >
                Upload
              </Link>

              <Link
                to="/my-uploads"
                className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
              >
                My Uploads
              </Link>

              <Link
                to="/bookmarks"
                className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
              >
                Bookmarks
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            /* Profile Menu */
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <User size={18} />
                </div>

                <div className="hidden text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs capitalize text-gray-500">
                    {user?.role || "student"}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                  {/* User Info */}
                  <div className="border-b border-gray-100 px-3 py-3">
                    <p className="font-semibold text-gray-900">
                      {user?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/my-uploads"
                    onClick={() => setProfileOpen(false)}
                    className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FileText size={17} />
                    My Uploads
                  </Link>

                  <Link
                    to="/bookmarks"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Bookmark size={17} />
                    Bookmarks
                  </Link>

                  <Link
                    to="/upload"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Upload size={17} />
                    Upload Paper
                  </Link>

                  <Link
                    to="/change-password"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={17} />
                    Change Password
                  </Link>

                  {/* Admin */}
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      <Shield size={17} />
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-gray-100"
            >
              Home
            </Link>

            <Link
              to="/repository"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-gray-100"
            >
              Repository
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/upload"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  Upload Paper
                </Link>

                <Link
                  to="/my-uploads"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  My Uploads
                </Link>

                <Link
                  to="/bookmarks"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  Bookmarks
                </Link>

                <Link
                  to="/change-password"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-gray-100"
                >
                  Change Password
                </Link>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
