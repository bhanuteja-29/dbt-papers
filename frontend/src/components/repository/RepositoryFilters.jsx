import {
  SlidersHorizontal,
} from "lucide-react";

import FilterPanel from "./FilterPanel";

const RepositoryFilters = ({
  sort,
  handleSortChange,

  filterOptions,

  courseInput,
  setCourseInput,

  selectedCourse,
  setSelectedCourse,

  courseCodeInput,
  setCourseCodeInput,

  selectedCourseCode,
  setSelectedCourseCode,

  academicYear,
  setAcademicYear,

  examType,
  setExamType,

  handleApplyFilters,
  handleClearFilters,
}) => {

  return (
    <>

      {/* ---------------------------------------------
          Filter Header
      --------------------------------------------- */}

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* -------------------------------------------
            Filter Title
        ------------------------------------------- */}

        <div className="flex items-center gap-2">

          <SlidersHorizontal
            size={18}
            className="text-slate-500"
          />

          <h2 className="font-semibold text-slate-800">
            Filters
          </h2>

        </div>

        {/* -------------------------------------------
            Sort
        ------------------------------------------- */}

        <div className="flex items-center gap-2">

          <label
            htmlFor="sort"
            className="text-sm text-slate-500"
          >
            Sort by
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              handleSortChange(e.target.value);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          >

            <option value="newest">
              Newest
            </option>

            <option value="views">
              Most Viewed
            </option>

            <option value="downloads">
              Most Downloaded
            </option>

            <option value="rating">
              Highest Rated
            </option>

          </select>

        </div>

      </div>

      {/* ---------------------------------------------
          Filter Panel
      --------------------------------------------- */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <FilterPanel

          onApply={handleApplyFilters}

          onClear={handleClearFilters}

          filterOptions={filterOptions}

          courseInput={courseInput}
          setCourseInput={setCourseInput}

          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}

          courseCodeInput={courseCodeInput}
          setCourseCodeInput={setCourseCodeInput}

          selectedCourseCode={selectedCourseCode}
          setSelectedCourseCode={setSelectedCourseCode}

          academicYear={academicYear}
          setAcademicYear={setAcademicYear}

          examType={examType}
          setExamType={setExamType}

        />

      </div>

    </>
  );
};

export default RepositoryFilters;