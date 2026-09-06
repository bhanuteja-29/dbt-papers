import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      setMessage(
        response.data.message ||
          "If an account exists with this email, a password reset link has been sent."
      );
    } catch (error) {
      console.error("FORGOT PASSWORD ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Login
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {!message ? (
            <>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                  <Mail className="text-blue-600" size={26} />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-slate-900">
                  Forgot Password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your registered email address and we'll
                  send you a link to reset your password.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending..."
                    : "Send Reset Link"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <CheckCircle
                  className="text-green-600"
                  size={28}
                />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Check Your Email
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {message}
              </p>

              <Link
                to="/login"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Back to Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;