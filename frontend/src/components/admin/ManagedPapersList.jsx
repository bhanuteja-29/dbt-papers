import { Loader2, FileQuestion } from "lucide-react";
import ManagedPaperCard from "./ManagedPaperCard";

const ManagedPapersList = ({
  papers,
  loading,
  onApprove,
  onDelete,
  onView,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          size={32}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  if (!papers.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <FileQuestion
          size={42}
          className="mx-auto text-gray-400"
        />

        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          No papers found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          There are no papers in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <ManagedPaperCard
          key={paper._id}
          paper={paper}
          onApprove={onApprove}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default ManagedPapersList;