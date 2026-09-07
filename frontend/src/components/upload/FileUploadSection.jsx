import {
  FileText,
  Image,
  Upload,
  X,
} from "lucide-react";

const FileUploadSection = ({
  files,
  onFileChange,
  onRemoveFile,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Upload Files
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload one PDF or up to 5 JPG/PNG images.
          Maximum 5 MB per file.
        </p>
      </div>

      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:scale-105">
          <Upload size={25} />
        </div>

        <p className="font-semibold text-slate-800">
          Click to select files
        </p>

        <p className="mt-1 text-sm text-slate-400">
          PDF, JPG or PNG
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Maximum 5 files • 5 MB each
        </p>

        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      {files.length > 0 && (
        <div className="mt-5 space-y-2">
          <p className="text-sm font-semibold text-slate-700">
            Selected files ({files.length})
          </p>

          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {file.type === "application/pdf" ? (
                    <FileText size={18} />
                  ) : (
                    <Image size={18} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {file.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="ml-3 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <X size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FileUploadSection;
