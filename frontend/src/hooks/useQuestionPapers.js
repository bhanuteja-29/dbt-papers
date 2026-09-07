import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const useQuestionPapers = ({ filters, page, limit,sort }) => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit,
          sort
        };

        if (filters.search.trim()) {
          params.search = filters.search.trim();
        }

        if (filters.course) {
          params.course = filters.course;
        }

        if (filters.courseCode) {
          params.courseCode = filters.courseCode;
        }

        if (filters.academicYear) {
          params.academicYear = filters.academicYear;
        }

        if (filters.examType) {
          params.examType = filters.examType;
        }

        const response = await api.get("/question-papers", {
          params,
          skipGlobalLoading: true,
        });

        setQuestionPapers(response.data.questionPapers);
        setPagination(response.data.pagination);
      } catch (err) {
        console.error("FETCH QUESTION PAPERS ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load question papers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionPapers();
  }, [filters, page, limit, sort, reloadKey]);

  return {
    questionPapers,
    pagination,
    loading,
    error,
    refetch: useCallback(() => setReloadKey((current) => current + 1), []),
  };
};

export default useQuestionPapers;
