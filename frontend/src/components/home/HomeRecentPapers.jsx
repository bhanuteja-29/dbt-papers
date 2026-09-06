import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import QuestionPaperCard from "../repository/QuestionPaperCard";
import LoadingState from "../common/LoadingState";

const HomeRecentPapers = () => {
  const navigate = useNavigate();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentPapers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/question-papers?page=1&limit=6&sort=newest"
        );

        setPapers(response.data.questionPapers || []);
      } catch (error) {
        console.error("FETCH RECENT PAPERS ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load recent question papers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPapers();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Recently added
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Latest Question Papers
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Browse the latest approved question papers added to the
              repository.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/repository")}
            className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all papers
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">

          {loading && (
            <LoadingState message="Loading recent papers..." />
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && papers.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="font-semibold text-slate-800">
                No question papers yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Be the first student to upload a question paper.
              </p>

              <button
                type="button"
                onClick={() => navigate("/upload")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Upload a Paper
              </button>
            </div>
          )}

          {!loading && !error && papers.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {papers.map((paper) => (
                <QuestionPaperCard
                  key={paper._id}
                  paper={paper}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HomeRecentPapers;