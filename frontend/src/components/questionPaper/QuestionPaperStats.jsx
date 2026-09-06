import {
  Download,
  Eye,
  Star,
} from "lucide-react";

const QuestionPaperStats = ({ paper }) => {
  return (
    <div className="grid grid-cols-3 border-b border-slate-200">
      <div className="flex flex-col items-center gap-1 border-r border-slate-200 py-5">
        <Eye
          size={18}
          className="text-slate-400"
        />

        <span className="font-semibold text-slate-800">
          {paper.views || 0}
        </span>

        <span className="text-xs text-slate-400">
          Views
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 border-r border-slate-200 py-5">
        <Download
          size={18}
          className="text-slate-400"
        />

        <span className="font-semibold text-slate-800">
          {paper.downloads || 0}
        </span>

        <span className="text-xs text-slate-400">
          Downloads
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 py-5">
        <Star
          size={18}
          className="text-yellow-500"
        />

        <span className="font-semibold text-slate-800">
          {paper.averageRating?.toFixed(1) || "0.0"}
        </span>

        <span className="text-xs text-slate-400">
          Rating
        </span>
      </div>
    </div>
  );
};

export default QuestionPaperStats;