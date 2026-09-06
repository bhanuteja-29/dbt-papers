import { Link, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  const location = useLocation();

  const email = location.state?.email;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <Mail
              size={38}
              strokeWidth={1.8}
              className="text-blue-600"
            />
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-2xl font-bold text-slate-900 sm:text-3xl">
            Check your inbox
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-slate-500">
            We've sent a verification link to your email address.
          </p>

          {/* Email */}
          {email && (
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="break-all text-sm font-semibold text-blue-700">
                {email}
              </p>
            </div>
          )}

          {/* Instructions */}
          <p className="mt-5 text-sm leading-6 text-slate-500">
            Click the link in the email to verify your account.
            Once verified, you'll be signed in automatically.
          </p>

          {/* Spam message */}
          <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-left">
            <p className="text-xs leading-5 text-slate-500">
              <span className="font-semibold text-slate-700">
                Didn't receive the email?
              </span>{" "}
              Check your spam or junk folder. The verification link may
              occasionally end up there.
            </p>
          </div>

          {/* Back to login */}
          <Link
            to="/login"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          {/* Future resend feature */}
          

        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;