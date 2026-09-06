import { ArrowLeft } from "lucide-react";

const UploadHeader = ({ onBack }) => {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Repository
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Upload Question Paper
        </h1>

        <p className="mt-2 text-slate-500">
          Share a previous year question paper with
          other students.
        </p>
      </div>
    </>
  );
};

export default UploadHeader;