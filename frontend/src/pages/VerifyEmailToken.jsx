import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const VerifyEmailToken = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  // Prevent duplicate requests in development
  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) return;

    verificationStarted.current = true;

    const verifyEmail = async () => {
      try {
        const response = await api.get(
          `/auth/verify-email/${token}`
        );

        console.log("EMAIL VERIFICATION RESPONSE:", response.data);

        const { accessToken, user } = response.data.data;

        // Automatically log the user in
        login(accessToken, user);

        setStatus("success");
        setMessage("Your email has been verified successfully!");

        // Redirect to home
        setTimeout(() => {
          navigate("/");
        }, 1800);
      } catch (error) {
        console.error("EMAIL VERIFICATION ERROR:", error);

        setStatus("error");

        setMessage(
          error.response?.data?.message ||
            "This verification link is invalid or has expired."
        );
      }
    };

    verifyEmail();
  }, [token, login, navigate]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

          {/* Loading */}
          {status === "loading" && (
            <>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <Loader2
                  size={40}
                  className="animate-spin text-blue-600"
                />
              </div>

              <h1 className="mt-7 text-2xl font-bold text-slate-900">
                Verifying your email...
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Please wait while we verify your account.
              </p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                <CheckCircle
                  size={42}
                  className="text-green-500"
                />
              </div>

              <h1 className="mt-7 text-2xl font-bold text-slate-900">
                Email Verified!
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {message}
              </p>

              <div className="mt-6 rounded-xl bg-green-50 px-4 py-3">
                <p className="text-sm font-medium text-green-700">
                  Your account is ready to use.
                </p>
              </div>

              <p className="mt-5 text-xs text-slate-400">
                Redirecting you to PYQ Hub...
              </p>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                <XCircle
                  size={42}
                  className="text-red-500"
                />
              </div>

              <h1 className="mt-7 text-2xl font-bold text-slate-900">
                Verification Failed
              </h1>

              <p className="mt-3 text-sm leading-6 text-red-500">
                {message}
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Go to Login
              </button>
            </>
          )}

        </div>
      </div>
    </main>
  );
};

export default VerifyEmailToken;