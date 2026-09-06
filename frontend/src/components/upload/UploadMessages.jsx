import { CheckCircle2 } from "lucide-react";

const UploadMessages = ({ error, success }) => {
  return (
    <>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}
    </>
  );
};

export default UploadMessages;