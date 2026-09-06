import { Bookmark } from "lucide-react";

const BookmarkButton = ({
  bookmarked,
  onToggle,
  loading = false,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={loading}
      aria-label={
        bookmarked
          ? "Remove bookmark"
          : "Bookmark question paper"
      }
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
        bookmarked
          ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <Bookmark
        size={18}
        className={bookmarked ? "fill-current" : ""}
      />

      {loading
        ? "Updating..."
        : bookmarked
        ? "Bookmarked"
        : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;