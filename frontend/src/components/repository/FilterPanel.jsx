import CourseAutocomplete from "./CourseAutocomplete";
import CourseCodeAutocomplete from "./CourseCodeAutocomplete";

const FilterPanel = ({
  onApply,
  onClear,

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
}) => {
  return (
    <div className="space-y-5">
      {/* ==================================================
          FILTER FIELDS
      ================================================== */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CourseAutocomplete
          value={courseInput}
          onChange={setCourseInput}
          selectedValue={selectedCourse}
          onSelect={setSelectedCourse}
          options={filterOptions.courses}
        />

        <CourseCodeAutocomplete
          value={courseCodeInput}
          onChange={setCourseCodeInput}
          selectedValue={selectedCourseCode}
          onSelect={setSelectedCourseCode}
          options={filterOptions.courseCodes}
        />

        {/* Academic Year */}

        <div>
          <label
            htmlFor="academicYear"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Academic Year
          </label>

          <select
            id="academicYear"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">All Years</option>

            {filterOptions.academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type */}

        <div>
          <label
            htmlFor="examType"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Exam Type
          </label>

          <select
            id="examType"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">All Exams</option>

            {filterOptions.examTypes.map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ==================================================
          ACTIONS
      ================================================== */}

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onApply}
          className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
