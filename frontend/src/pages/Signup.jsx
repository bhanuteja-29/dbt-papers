import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from "lucide-react";

import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Name
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    // Email
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!email.endsWith("@vitapstudent.ac.in")) {
      newErrors.email = "Please use your VIT-AP student email address.";
    }

    // Password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Za-z]/.test(password)) {
      newErrors.password = "Password must contain at least one letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const response = await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      console.log("SIGNUP RESPONSE:", response.data);

      navigate("/verify-email/", {
        state: {
          email: form.email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      setServerError(
        error.response?.data?.message || "Unable to create account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join the PYQ Hub student community
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-4 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
              />
            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="groot.24bca4545@vitapstudent.ac.in"
                className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition focus:ring-4 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`w-full rounded-xl border py-3 pl-10 pr-12 text-sm outline-none transition focus:ring-4 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.password}
              </p>
            )}

            <div className="mt-2 text-xs text-red-400 font-bold">
              Note: This can be anything. It has nothing to do with your
              original gmail password.
            </div>

            <p className="mt-2 text-xs text-slate-400">
              At least 8 characters with at least one letter and one number.
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UserPlus size={18} />

            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;
