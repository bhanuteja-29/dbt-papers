import {
  RotateCcw,
} from "lucide-react";

import QuestionPaperCard from "./QuestionPaperCard";
import Pagination from "./Pagination";
import LoadingState from "../common/LoadingState";

const RepositoryResults = ({
  papersRef,

  pagination,
  questionPapers,

  loading,
  error,
  refetch,

  handlePageChange,

  hasActiveFilters,
  handleClearFilters,
}) => {

  return (
    <>

      {/* =============================================
          RESULTS HEADER
      ============================================= */}

      <div
        ref={papersRef}
        className="mb-5 mt-8 flex scroll-mt-24 items-end justify-between gap-4"
      >

        {/* -------------------------------------------
            Title + Count
        ------------------------------------------- */}

        <div>

          <h2 className="text-lg font-bold text-slate-900">
            Question Papers
          </h2>

          <p className="mt-1 text-sm text-slate-500">

            {loading
              ? "Loading papers..."
              : `${pagination.total} paper${
                  pagination.total !== 1 ? "s" : ""
                } found`}

          </p>

        </div>

        {/* -------------------------------------------
            Clear Filters
        ------------------------------------------- */}

        {hasActiveFilters && (

          <button
            type="button"
            onClick={handleClearFilters}
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >

            <RotateCcw size={15} />

            <span>
              Clear filters
            </span>

          </button>

        )}

      </div>

      {/* =============================================
          LOADING STATE
      ============================================= */}

      {loading && (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {Array.from({ length: 12 }, (_, index) => index + 1).map(
            (item) => (

              <div
                key={item}
                className="h-[280px] animate-pulse rounded-2xl border border-slate-200 bg-white"
              />

            )
          )}

        </div>

      )}

      {/* =============================================
          ERROR STATE
      ============================================= */}

      {!loading && error && (

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
            ⚠️
          </div>

          <h3 className="mt-4 font-semibold text-red-800">
            Something went wrong
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={refetch}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
          >
            Try Again
          </button>

        </div>

      )}

      {/* =============================================
          EMPTY STATE
      ============================================= */}

      {!loading &&
        !error &&
        questionPapers.length === 0 && (

          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

            {/* Icon */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              📄
            </div>

            {/* Title */}

            <h3 className="mt-4 font-bold text-slate-900">
              No question papers found
            </h3>

            {/* Description */}

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find any question papers
              matching your search or filters.
              Try changing your search criteria.
            </p>

            {/* Clear */}

            {hasActiveFilters && (

              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Clear Filters
              </button>

            )}

          </div>

        )}

      {/* =============================================
          QUESTION PAPER CARDS
      ============================================= */}

      {!loading &&
        !error &&
        questionPapers.length > 0 && (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {questionPapers.map((paper) => (

              <QuestionPaperCard
                key={paper._id}
                paper={paper}
              />

            ))}

          </div>

        )}

      {/* =============================================
          PAGINATION
      ============================================= */}

      {!loading &&
        !error &&
        pagination.totalPages > 1 && (

          <div className="mt-10">

            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />

          </div>

        )}

    </>
  );
};

export default RepositoryResults;
