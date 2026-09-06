import { FileText } from "lucide-react";

const QuestionPaperHeader = ({ paper }) => {
  return (
    <div className="border-b border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {paper.examType}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {paper.academicYear}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {paper.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {paper.course}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <FileText
            size={24}
            className="text-blue-600"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Course Code
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {paper.courseCode}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Academic Year
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {paper.academicYear}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Exam Type
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {paper.examType}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Uploaded By
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {paper.uploadedBy?.name || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaperHeader;