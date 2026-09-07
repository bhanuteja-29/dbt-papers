import {
  useEffect,
  useRef,
  useState,
} from "react";

import api from "../services/api";

import useQuestionPapers from "../hooks/useQuestionPapers";

import RepositoryHero from "../components/repository/RepositoryHero";
import RepositoryFilters from "../components/repository/RepositoryFilters";
import RepositoryResults from "../components/repository/RepositoryResults";

const Repository = () => {

  // ==================================================
  // CONSTANTS
  // ==================================================

  // Four complete rows on the desktop three-column grid.
  const limit = 12;

  // ==================================================
  // SEARCH
  // ==================================================

  const [search, setSearch] = useState("");

  // ==================================================
  // FILTER DRAFT VALUES
  // ==================================================

  const [courseInput, setCourseInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [courseCodeInput, setCourseCodeInput] =
    useState("");

  const [selectedCourseCode, setSelectedCourseCode] =
    useState("");

  const [academicYear, setAcademicYear] =
    useState("");

  const [examType, setExamType] =
    useState("");

  // ==================================================
  // APPLIED FILTERS
  // ==================================================

  const [filters, setFilters] = useState({
    search: "",
    course: "",
    courseCode: "",
    academicYear: "",
    examType: "",
  });

  // ==================================================
  // SORT
  // ==================================================

  const [sort, setSort] =
    useState("newest");

  // ==================================================
  // PAGINATION
  // ==================================================

  const [page, setPage] =
    useState(1);

  // ==================================================
  // FILTER OPTIONS
  // ==================================================

  const [filterOptions, setFilterOptions] =
    useState({
      courses: [],
      courseCodes: [],
      academicYears: [],
      examTypes: [],
    });

  // ==================================================
  // RESULTS REF
  // ==================================================

  const papersRef = useRef(null);

  // ==================================================
  // FETCH QUESTION PAPERS
  // ==================================================

  const {
    questionPapers,
    pagination,
    loading,
    error,
    refetch,
  } = useQuestionPapers({
    filters,
    page,
    limit,
    sort,
  });

  // ==================================================
  // FETCH FILTER OPTIONS
  // ==================================================

  useEffect(() => {

    const fetchFilters = async () => {

      try {

        const response = await api.get(
          "/question-papers/filters",
          { skipGlobalLoading: true }
        );

        setFilterOptions(
          response.data.filters || {
            courses: [],
            courseCodes: [],
            academicYears: [],
            examTypes: [],
          }
        );

      } catch (error) {

        console.error(
          "FETCH FILTER OPTIONS ERROR:",
          error
        );

      }

    };

    fetchFilters();

  }, []);

  // ==================================================
  // AUTOMATIC SEARCH
  //
  // Search is triggered 400ms after the user stops
  // typing.
  // ==================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      setPage(1);

      setFilters((currentFilters) => {

        if (
          currentFilters.search === search
        ) {
          return currentFilters;
        }

        return {
          ...currentFilters,
          search,
        };

      });

    }, 400);

    return () => {
      clearTimeout(timer);
    };

  }, [search]);

  // ==================================================
  // APPLY FILTERS
  // ==================================================

  const handleApplyFilters = () => {

    setPage(1);

    setFilters((currentFilters) => ({

      ...currentFilters,

      course: selectedCourse,

      courseCode: selectedCourseCode,

      academicYear,

      examType,

    }));

    // Scroll to results after applying.
    setTimeout(() => {

      papersRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 100);

  };

  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  const handleClearFilters = () => {

    // Search

    setSearch("");

    // Course

    setCourseInput("");
    setSelectedCourse("");

    // Course code

    setCourseCodeInput("");
    setSelectedCourseCode("");

    // Academic year

    setAcademicYear("");

    // Exam type

    setExamType("");

    // Page

    setPage(1);

    // Backend filters

    setFilters({
      search: "",
      course: "",
      courseCode: "",
      academicYear: "",
      examType: "",
    });

  };

  // ==================================================
  // SORT CHANGE
  // ==================================================

  const handleSortChange = (value) => {

    setSort(value);

    setPage(1);

  };

  // ==================================================
  // PAGE CHANGE
  // ==================================================

  const handlePageChange = (newPage) => {

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ==================================================
  // ACTIVE FILTER CHECK
  // ==================================================

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(selectedCourse) ||
    Boolean(selectedCourseCode) ||
    Boolean(academicYear) ||
    Boolean(examType);

  // ==================================================
  // RENDER
  // ==================================================

  return (

    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">

      {/* ==================================================
          HERO + SEARCH
      ================================================== */}

      <RepositoryHero

        search={search}

        setSearch={setSearch}

        loading={loading}

        pagination={pagination}

        questionPapers={questionPapers}

        papersRef={papersRef}

      />

      {/* ==================================================
          REPOSITORY
      ================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ==================================================
            FILTERS
        ================================================== */}

        <RepositoryFilters

          sort={sort}

          handleSortChange={handleSortChange}

          filterOptions={filterOptions}

          courseInput={courseInput}
          setCourseInput={setCourseInput}

          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}

          courseCodeInput={courseCodeInput}
          setCourseCodeInput={setCourseCodeInput}

          selectedCourseCode={selectedCourseCode}
          setSelectedCourseCode={
            setSelectedCourseCode
          }

          academicYear={academicYear}
          setAcademicYear={setAcademicYear}

          examType={examType}
          setExamType={setExamType}

          handleApplyFilters={
            handleApplyFilters
          }

          handleClearFilters={
            handleClearFilters
          }

        />

        {/* ==================================================
            RESULTS
        ================================================== */}

        <RepositoryResults

          papersRef={papersRef}

          pagination={pagination}

          questionPapers={questionPapers}

          loading={loading}

          error={error}

          refetch={refetch}

          page={page}

          handlePageChange={
            handlePageChange
          }

          hasActiveFilters={
            hasActiveFilters
          }

          handleClearFilters={
            handleClearFilters
          }

        />

      </section>

    </main>

  );
};

export default Repository;
