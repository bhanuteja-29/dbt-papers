import {
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

const QuestionPaperFiles = ({
  paper,
  onDownload,
}) => {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          Question Paper Files
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {paper.files.length} file
          {paper.files.length !== 1 ? "s" : ""} attached
        </p>
      </div>

      <div className="space-y-3">
        {paper.files.map((file, index) => (
          <div
            key={file.filePublicId}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <FileText
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  File {index + 1}: {file.fileName}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {(file.fileSize / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <ExternalLink size={15} />
                View
              </a>

              <button
                type="button"
                onClick={() => onDownload(file)}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Download size={15} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPaperFiles;