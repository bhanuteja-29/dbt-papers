import { useEffect, useState } from "react";
import { Bookmark, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import QuestionPaperCard from "../components/repository/QuestionPaperCard";
import LoadingState from "../components/common/LoadingState";

const Bookmarks = () => {
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/bookmarks/my");

        setBookmarks(response.data.bookmarks || []);
      } catch (error) {
        console.error("FETCH BOOKMARKS ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your bookmarks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (paperId) => {
    try {
      await api.delete(`/bookmarks/question-papers/${paperId}`);

      setBookmarks((prev) =>
        prev.filter(
          (bookmark) => bookmark.questionPaper?._id !== paperId
        )
      );
    } catch (error) {
      console.error("REMOVE BOOKMARK ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to remove bookmark"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <LoadingState message="Loading your bookmarks..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/repository")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Repository
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Bookmark size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                My Bookmarks
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Question papers you saved for later.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!error && bookmarks.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Bookmark size={26} />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              No bookmarks yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Save question papers you want to come back to later.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Question Papers
            </button>
          </div>
        )}

        {/* Bookmark list */}
        {bookmarks.length > 0 && (
          <div className="space-y-4">
            {bookmarks.map((bookmark) => {
              const paper = bookmark.questionPaper;

              if (!paper) {
                return null;
              }

              return (
                <div
                  key={bookmark._id}
                  className="relative"
                >
                  <QuestionPaperCard paper={paper} />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveBookmark(paper._id)
                    }
                    className="absolute right-4 top-4 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;