import { useNavigate } from "react-router-dom";


 

const QuestionPaperCard = ({ paper }) => {
  const navigate = useNavigate();

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div>
          <h2 className="line-clamp-2 text-sm font-bold text-slate-900 sm:text-base">
  {paper.title}
</h2>

          <p className="mt-1 text-sm text-slate-500">
  {paper.course}
</p>
        </div>

        <span className="max-w-[90px] shrink-0 truncate rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
  {paper.examType}
</span>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
  {paper.courseCode}
</span>

<span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
  {paper.academicYear}
</span>

      </div>

      {/* Stats */}
      <div className="mt-5 flex items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500">

  <span className="flex items-center gap-1.5">
    <span>👁</span>
    {paper.views}
  </span>

  <span className="flex items-center gap-1.5">
    <span>↓</span>
    {paper.downloads}
  </span>

  <span className="flex items-center gap-1.5">
    <span>⭐</span>
    {paper.averageRating?.toFixed(1) || "0.0"}
  </span>

</div>

      {/* Button */}
      <button
        type="button"
        onClick={() =>
          navigate(`/question-papers/${paper._id}`)
        }
        className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View Question Paper
      </button>
    </div>
  );
};

export default QuestionPaperCard;