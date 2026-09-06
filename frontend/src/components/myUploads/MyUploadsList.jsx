import { Upload } from "lucide-react";

import QuestionPaperCard from "../repository/QuestionPaperCard";
import MyUploadStatusCard from "./MyUploadStatusCard";

const MyUploadsList = ({ papers }) => {
  if (papers.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Upload size={26} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          No uploaded papers yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          You haven't uploaded any question papers yet.
          Start contributing to the repository.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          Your Papers
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Showing {papers.length} paper
          {papers.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) =>
          paper.status === "approved" ? (
            <QuestionPaperCard
              key={paper._id}
              paper={paper}
            />
          ) : (
            <MyUploadStatusCard
              key={paper._id}
              paper={paper}
            />
          )
        )}
      </div>
    </>
  );
};

export default MyUploadsList;