import { Loader2 } from "lucide-react";
import { useLoading } from "../../context/LoadingContext";

const LoadingOverlay = () => {
  const { loading, message } = useLoading();

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="flex min-w-[240px] flex-col items-center rounded-2xl bg-white px-8 py-7 shadow-2xl">
        <Loader2
          size={42}
          className="animate-spin text-blue-600"
        />

        <p className="mt-4 text-sm font-semibold text-slate-800">
          {message}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;