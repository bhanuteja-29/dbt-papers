import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

import api from "../services/api";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.patch(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

      setMessage(
        response.data.message ||
          "Your password has been changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("CHANGE PASSWORD ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:py-8">
      <div className="mx-auto w-full max-w-md">

        {/* Back to Home */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <Lock
                size={26}
                className="text-blue-600"
              />
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-900">
              Change Password
            </h1>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Update your account password securely.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >

            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Current Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={
                    showCurrentPassword
                      ? "Hide current password"
                      : "Show current password"
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                New Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={
                    showNewPassword
                      ? "Hide new password"
                      : "Show new password"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle size={18} />
                <span>{message}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Updating Password..."
                : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;