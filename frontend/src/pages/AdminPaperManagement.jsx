import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import AdminPaperManagementHeader from "../components/admin/AdminPaperManagementHeader";
import ManagedPapersList from "../components/admin/ManagedPapersList";

const AdminPaperManagement = () => {
  console.log("AdminPaperManagement rendered");

  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState("approved");

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const [error, setError] = useState("");

  const fetchPapers = useCallback(
    async (status = activeStatus, page = 1) => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/question-papers/admin/manage", {
          params: {
            status,
            page,
            limit: 10,
          },
        });

        console.log("ADMIN MANAGE RESPONSE:", response);
        console.log("ADMIN MANAGE DATA:", response.data);

        setPapers(response.data.questionPapers || []);

        setPagination(
          response.data.pagination || {
            page: 1,
            totalPages: 1,
            total: 0,
          },
        );
      } catch (err) {
        console.error("Failed to fetch admin papers:", err);

        setError(
          err.response?.data?.message || "Failed to load question papers.",
        );
      } finally {
        setLoading(false);
      }
    },
    [activeStatus],
  );

  useEffect(() => {
    fetchPapers(activeStatus, 1);
  }, [activeStatus, fetchPapers]);

  const handleStatusChange = (status) => {
    setActiveStatus(status);
  };

  const handleApprove = async (paperId) => {
    try {
      setError("");

      await api.patch(`/question-papers/${paperId}/approve`);

      // Remove it from rejected list immediately
      setPapers((prev) => prev.filter((paper) => paper._id !== paperId));

      setPagination((prev) => ({
        ...prev,
        total: Math.max(prev.total - 1, 0),
      }));
    } catch (err) {
      console.error("Failed to approve paper:", err);

      setError(
        err.response?.data?.message || "Failed to approve question paper.",
      );
    }
  };

  const handleDelete = async (paperId) => {
    try {
      setError("");

      await api.delete(`/question-papers/${paperId}`);

      // Remove immediately from UI
      setPapers((prev) => prev.filter((paper) => paper._id !== paperId));

      setPagination((prev) => ({
        ...prev,
        total: Math.max(prev.total - 1, 0),
      }));
    } catch (err) {
      console.error("Failed to delete paper:", err);

      setError(
        err.response?.data?.message || "Failed to delete question paper.",
      );
    }
  };

  const handleView = (paperId) => {
    navigate(`/question-papers/${paperId}`);
  };

  const handlePageChange = (page) => {
    fetchPapers(activeStatus, page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminPaperManagementHeader
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        <ManagedPapersList
          papers={papers}
          loading={loading}
          onApprove={handleApprove}
          onDelete={handleDelete}
          onView={handleView}
        />

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => handlePageChange(pagination.page - 1)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPaperManagement;
