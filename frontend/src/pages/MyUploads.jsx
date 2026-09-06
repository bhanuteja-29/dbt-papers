import { useEffect, useState } from "react";

import api from "../services/api";

import LoadingState from "../components/common/LoadingState";
import MyUploadsHeader from "../components/myUploads/MyUploadsHeader";
import MyUploadsStats from "../components/myUploads/MyUploadsStats";
import MyUploadsList from "../components/myUploads/MyUploadsList";
import Pagination from "../components/repository/Pagination";

const MyUploads = () => {
  const [papers, setPapers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyUploads = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/question-papers/my-uploads", {
        params: {
          page,
          limit: 10,
        },
      });

      setPapers(response.data.questionPapers || []);

      setStats(
        response.data.stats || {
          total: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
        }
      );

      setPagination(
        response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (error) {
      console.error("FETCH MY UPLOADS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load your uploaded papers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyUploads(1);
  }, []);

  const handlePageChange = (page) => {
    fetchMyUploads(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <MyUploadsHeader />

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingState />
        ) : (
          <>
            <MyUploadsStats stats={stats} />

            <MyUploadsList papers={papers} />

            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyUploads;