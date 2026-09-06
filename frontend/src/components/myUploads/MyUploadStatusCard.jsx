const MyUploadStatusCard = ({ paper }) => {
  const isPending = paper.status === "pending";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-sm font-bold text-slate-900 sm:text-base">
            {paper.title}
          </h2>

          <p className="mt-1 truncate text-sm text-slate-500">
            {paper.course}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            isPending
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {paper.status}
        </span>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {paper.courseCode}
        </span>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {paper.academicYear}
        </span>

        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          {paper.examType}
        </span>
      </div>

      {/* Status */}
      <div
        className={`mt-5 rounded-xl p-4 ${
          isPending ? "bg-yellow-50" : "bg-red-50"
        }`}
      >
        <p
          className={`text-sm font-semibold ${
            isPending ? "text-yellow-800" : "text-red-800"
          }`}
        >
          {isPending
            ? "Waiting for admin approval"
            : "This paper was rejected"}
        </p>

        <p
          className={`mt-1 text-xs ${
            isPending ? "text-yellow-700" : "text-red-700"
          }`}
        >
          {isPending
            ? "Your paper has been submitted successfully and is currently under review."
            : "This paper is not currently available in the public repository."}
        </p>
      </div>
    </div>
  );
};

export default MyUploadStatusCard;