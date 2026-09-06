import { useEffect, useState } from "react";
import {
  X,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ReviewPaperModal = ({
  paper,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}) => {
  const [currentFile, setCurrentFile] = useState(0);

  useEffect(() => {
    setCurrentFile(0);
  }, [paper]);

  if (!paper) {
    return null;
  }

  const files = paper.files || [];
  const file = files[currentFile];

  const isImage =
    file?.resourceType === "image" ||
    /\.(jpg|jpeg|png)$/i.test(file?.fileName || "");

  const isPdf =
    file?.resourceType === "raw" ||
    /\.pdf$/i.test(file?.fileName || "");

  const nextFile = () => {
    setCurrentFile((prev) =>
      prev < files.length - 1 ? prev + 1 : prev
    );
  };

  const previousFile = () => {
    setCurrentFile((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900">
              {paper.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {paper.course} • {paper.courseCode}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* File information */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText
              size={17}
              className="shrink-0 text-slate-500"
            />

            <span className="truncate text-sm font-medium text-slate-700">
              {file?.fileName || "No file"}
            </span>

            {files.length > 1 && (
              <span className="shrink-0 text-xs text-slate-500">
                ({currentFile + 1} / {files.length})
              </span>
            )}
          </div>

          {file?.fileUrl && (
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-3 flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ExternalLink size={14} />
              Open
            </a>
          )}
        </div>

        {/* Preview */}
        <div className="min-h-0 flex-1 overflow-auto bg-slate-100 p-4 sm:p-6">

          {!file ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-slate-500">
                No files available.
              </p>
            </div>
          ) : isImage ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <img
                src={file.fileUrl}
                alt={file.fileName}
                className="max-h-[65vh] max-w-full rounded-lg object-contain shadow-md"
              />
            </div>
          ) : isPdf ? (
            <iframe
              src={file.fileUrl}
              title={file.fileName}
              className="h-[65vh] min-h-[400px] w-full rounded-lg border border-slate-200 bg-white"
            />
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center">
              <FileText
                size={42}
                className="text-slate-400"
              />

              <p className="mt-3 text-sm text-slate-500">
                Preview unavailable for this file type.
              </p>

              <a
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Open File
              </a>
            </div>
          )}

        </div>

        {/* Multiple file navigation */}
        {files.length > 1 && (
          <div className="flex items-center justify-center gap-4 border-t border-slate-200 bg-white px-5 py-3">
            <button
              type="button"
              onClick={previousFile}
              disabled={currentFile === 0}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous file"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-xs font-medium text-slate-500">
              File {currentFile + 1} of {files.length}
            </span>

            <button
              type="button"
              onClick={nextFile}
              disabled={currentFile === files.length - 1}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next file"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end">

          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onReject(paper._id)}
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>

          <button
            type="button"
            disabled={actionLoading}
            onClick={() => onApprove(paper._id)}
            className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Approve
          </button>

        </div>

      </div>
    </div>
  );
};

export default ReviewPaperModal;