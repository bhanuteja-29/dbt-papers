const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const {
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = pagination;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;