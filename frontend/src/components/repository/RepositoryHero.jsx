import {
  Search,
  ArrowDown,
} from "lucide-react";

const RepositoryHero = ({
  search,
  setSearch,
  loading,
  pagination,
  questionPapers,
  papersRef,
}) => {

  // ---------------------------------------------
  // Scroll to results
  // ---------------------------------------------

  const scrollToResults = () => {
    papersRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ---------------------------------------------
  // Whether View Results should be enabled
  // ---------------------------------------------

  const canViewResults =
    !loading && questionPapers.length > 0;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* -----------------------------------------
            Hero Content
        ----------------------------------------- */}

        <div className="max-w-3xl">

          <div className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            VIT-AP University Question Paper Repository
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find your question papers
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Search, filter and access previous-year
            question papers from your university.
          </p>

        </div>

        {/* -----------------------------------------
            Search Area
        ----------------------------------------- */}

        <div className="mt-6 max-w-5xl">

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* ---------------------------------------
                Search Input
            --------------------------------------- */}

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    canViewResults
                  ) {
                    scrollToResults();
                  }
                }}
                placeholder="Search by title, course or course code..."
                aria-label="Search question papers"
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              {/* -------------------------------------
                  Loading Spinner
              ------------------------------------- */}

              {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                </div>
              )}

            </div>

            {/* ---------------------------------------
                View Results Button
            --------------------------------------- */}

            <button
              type="button"
              disabled={!canViewResults}
              onClick={scrollToResults}
              className={`flex shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold shadow-sm outline-none transition focus:ring-4 focus:ring-blue-500/20 ${
                canViewResults
                  ? "bg-slate-900 text-white hover:bg-blue-600"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              <span>View Results</span>

              <ArrowDown size={17} />
            </button>

          </div>

          {/* -----------------------------------------
              Search Status

              IMPORTANT:
              This is shown ONLY when the user
              actually searches something.
          ----------------------------------------- */}

          {search && (
            <div className="mt-3 flex min-h-[24px] items-center">

              {loading ? (

                <div className="flex items-center gap-2 text-sm text-slate-400">

                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

                  <span>
                    Searching...
                  </span>

                </div>

              ) : (

                <div className="flex items-center gap-1.5 text-sm">

                  <span className="font-semibold text-slate-700">
                    {pagination.total}
                  </span>

                  <span className="text-slate-400">
                    {pagination.total === 1
                      ? "paper found"
                      : "papers found"}
                  </span>

                </div>

              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default RepositoryHero;