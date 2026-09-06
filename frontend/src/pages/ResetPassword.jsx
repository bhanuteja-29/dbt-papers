import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(
        response.data?.message ||
          "Password reset successfully. You can now log in."
      );

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Reset Password
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Create a new password for your account.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />

              <p className="text-sm text-green-700">
                {message}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />

              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                New Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-11 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-1">
                Password must be at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-11 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;