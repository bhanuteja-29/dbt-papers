import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";
import BookmarkButton from "../components/questionPaper/BookmarkButton";
import QuestionPaperHeader from "../components/questionPaper/QuestionPaperHeader";
import QuestionPaperStats from "../components/questionPaper/QuestionPaperStats";
import QuestionPaperFiles from "../components/questionPaper/QuestionPaperFiles";
import QuestionPaperAI from "../components/questionPaper/QuestionPaperAI";
import LoadingState from "../components/common/LoadingState";
import { useAuth } from "../context/AuthContext";
import RatingSection from "../components/questionPaper/RatingSection";
import CommentsSection from "../components/questionPaper/CommentsSection";



const QuestionPaperDetails = () => {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [myRating, setMyRating] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(true);
  const [bookmarkUpdating, setBookmarkUpdating] = useState(false);



  useEffect(() => {
    const fetchPaper = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/question-papers/${id}`);

        setPaper(response.data.questionPaper);
      } catch (error) {
        console.error("FETCH PAPER ERROR:", error);

        setError(
          error.response?.data?.message || "Failed to load question paper",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated) {
      setMyRating(null);
      return;
    }

    const fetchMyRating = async () => {
      try {
        const response = await api.get(`/ratings/question-papers/${id}`);

        setMyRating(response.data.rating);
      } catch (error) {
        console.error("FETCH MY RATING ERROR:", error);
      }
    };

    fetchMyRating();
  }, [id, isAuthenticated]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsLoading(true);

        const response = await api.get(`/comments/question-papers/${id}`);

        setComments(response.data.comments || []);
      } catch (error) {
        console.error("FETCH COMMENTS ERROR:", error);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        setBookmarkLoading(true);

        const response = await api.get(`/bookmarks/question-papers/${id}`);

        setBookmarked(response.data.bookmarked);
      } catch (error) {
        console.error("FETCH BOOKMARK STATUS ERROR:", error);
      } finally {
        setBookmarkLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [id]);

  const handleBookmarkToggle = async () => {
    try {
      setBookmarkUpdating(true);
      setError("");

      if (bookmarked) {
        await api.delete(`/bookmarks/question-papers/${id}`);

        setBookmarked(false);
      } else {
        await api.post(`/bookmarks/question-papers/${id}`);

        setBookmarked(true);
      }
    } catch (error) {
      console.error("BOOKMARK ERROR:", error);

      setError(error.response?.data?.message || "Failed to update bookmark");
    } finally {
      setBookmarkUpdating(false);
    }
  };
  const handleAddComment = async (content) => {
    try {
      setSubmittingComment(true);

      const response = await api.post(`/comments/question-papers/${id}`, {
        content,
      });

      setComments((prev) => [response.data.comment, ...prev]);
    } catch (error) {
      console.error("ADD COMMENT ERROR:", error);

      setError(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      const response = await api.patch(`/comments/${commentId}`, {
        content,
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? response.data.comment : comment,
        ),
      );
    } catch (error) {
      console.error("UPDATE COMMENT ERROR:", error);

      setError(error.response?.data?.message || "Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/comments/${commentId}`);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.error("DELETE COMMENT ERROR:", error);

      setError(error.response?.data?.message || "Failed to delete comment");
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await api.get(`/question-papers/${id}/download`);

      const downloadedFile = response.data.files.find(
        (item) => item.filePublicId === file.filePublicId,
      );

      if (!downloadedFile) {
        throw new Error("File not found");
      }

      const link = document.createElement("a");

      link.href = downloadedFile.fileUrl;
      link.download = downloadedFile.fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setPaper((prev) => ({
        ...prev,
        downloads: response.data.downloads,
      }));
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
    }
  };

  const handleRatingSubmit = async (rating) => {
    try {
      setSubmittingRating(true);
      setError("");

      const response = await api.post(`/ratings/question-papers/${id}`, {
        rating,
      });

      setMyRating(rating);

      setPaper((prev) => ({
        ...prev,
        averageRating: response.data.averageRating,
        ratingCount: response.data.ratingCount,
      }));
    } catch (error) {
      console.error("RATING ERROR:", error);

      setError(error.response?.data?.message || "Failed to submit rating");
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleAskAI = (ai) => {
    const aiUrl =
      ai === "chatgpt" ? "https://chatgpt.com/" : "https://gemini.google.com/";

    window.open(aiUrl, "_blank", "width=1000,height=800");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <LoadingState message="Loading question paper..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <p className="font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => navigate("/repository")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Repository
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!paper) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Repository
          </button>

          {!bookmarkLoading && (
            <BookmarkButton
              bookmarked={bookmarked}
              onToggle={handleBookmarkToggle}
              loading={bookmarkUpdating}
            />
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <QuestionPaperHeader paper={paper} />

          <QuestionPaperStats paper={paper} />

          <QuestionPaperFiles paper={paper} onDownload={handleDownload} />

          <QuestionPaperAI onAskAI={handleAskAI} />

          <RatingSection
            currentRating={myRating}
            onSubmit={handleRatingSubmit}
            submitting={submittingRating}
          />

          <CommentsSection
            comments={comments}
            loading={commentsLoading}
            currentUser={user}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            submitting={submittingComment}
          />

      

          
        </div>
      </main>
    </div>
  );
};

export default QuestionPaperDetails;
