import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const RatingSection = ({
  currentRating = null,
  onSubmit,
  submitting = false,
}) => {
  const [selectedRating, setSelectedRating] =
    useState(currentRating);

  useEffect(() => {
    setSelectedRating(currentRating);
  }, [currentRating]);

  const handleSubmit = async () => {
    if (!selectedRating) {
      return;
    }

    await onSubmit(selectedRating);
  };

  return (
    <section className="border-t border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Rate this question paper
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your rating helps other students find useful papers.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                disabled={submitting}
                aria-label={`Rate ${star} out of 5`}
                className="rounded-md p-1 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Star
                  size={24}
                  className={
                    star <= selectedRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedRating || submitting}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {submitting
              ? "Submitting..."
              : "Submit Rating"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default RatingSection;