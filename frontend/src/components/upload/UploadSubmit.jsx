import { Upload } from "lucide-react";

const UploadSubmit = ({ uploading }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={uploading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        <Upload size={18} />

        {uploading
          ? "Uploading..."
          : "Upload Question Paper"}
      </button>
    </div>
  );
};

export default UploadSubmit;