import { useEffect, useState } from "react";

import api from "../services/api";

import LoadingState from "../components/common/LoadingState";
import AdminHeader from "../components/admin/AdminHeader";
import AdminStats from "../components/admin/AdminStats";
import ReviewPaperModal from "../components/admin/ReviewPaperModal";
import PendingPapersList from "../components/admin/PendingPapersList";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const AdminDashboard = () => {
  const [papers, setPapers] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const handleReview = (paper) => {
    setSelectedPaper(paper);
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [pendingResponse, statsResponse] = await Promise.all([
        api.get("/question-papers/pending"),
        api.get("/question-papers/admin/stats"),
      ]);

      setPapers(pendingResponse.data.questionPapers || []);

      setStats(
        statsResponse.data.stats || {
          total: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
        },
      );
    } catch (error) {
      console.error("FETCH ADMIN DASHBOARD ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to load admin dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleApprove = async (paperId) => {
    try {
      setActionLoading(paperId);
      setError("");

      await api.patch(`/question-papers/${paperId}/approve`);

      setPapers((prev) => prev.filter((paper) => paper._id !== paperId));

      setStats((prev) => ({
        ...prev,
        pending: Math.max(prev.pending - 1, 0),
        approved: prev.approved + 1,
      }));
    } catch (error) {
      console.error("APPROVE PAPER ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to approve question paper.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (paperId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this question paper?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(paperId);
      setError("");

      await api.patch(`/question-papers/${paperId}/reject`);

      setPapers((prev) => prev.filter((paper) => paper._id !== paperId));

      setStats((prev) => ({
        ...prev,
        pending: Math.max(prev.pending - 1, 0),
        rejected: prev.rejected + 1,
      }));
    } catch (error) {
      console.error("REJECT PAPER ERROR:", error);

      setError(
        error.response?.data?.message || "Failed to reject question paper.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleted = (deletedId) => {
  setPapers((prevPapers) =>
    prevPapers.filter((paper) => paper._id !== deletedId)
  );
};

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminHeader />
      
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingState />
        ) : (
          <>
            <AdminStats stats={stats} />

            <PendingPapersList papers={papers} onReview={handleReview} onDeleted={handleDeleted}/>
          </>
        )}
      </div>
      {selectedPaper && (
        <ReviewPaperModal
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
          onApprove={async (paperId) => {
            await handleApprove(paperId);
            setSelectedPaper(null);
          }}
          onReject={async (paperId) => {
            await handleReject(paperId);
            setSelectedPaper(null);
          }}
          actionLoading={actionLoading === selectedPaper._id}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
