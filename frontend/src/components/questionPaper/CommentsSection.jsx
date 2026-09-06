import { useState } from "react";
import {
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";

const CommentsSection = ({
  comments,
  loading,
  currentUser,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  submitting,
}) => {
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    await onAddComment(trimmedContent);

    setContent("");
  };

  const startEditing = (comment) => {
    setEditingId(comment._id);
    setEditingContent(comment.content);
    setOpenMenuId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const handleUpdate = async (commentId) => {
    const trimmedContent = editingContent.trim();

    if (!trimmedContent) {
      return;
    }

    await onUpdateComment(commentId, trimmedContent);

    setEditingId(null);
    setEditingContent("");
  };

  const canModifyComment = (comment) => {
    if (!currentUser) {
      return false;
    }

    const commentUserId = comment.user?._id || comment.user;

    const currentUserId = currentUser._id || currentUser.id || currentUser.sub;

    return (
      commentUserId &&
      currentUserId &&
      String(commentUserId) === String(currentUserId)
    );
  };

  return (
    <section className="border-t border-slate-200 p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <MessageCircle size={20} className="text-blue-600" />

        <h2 className="text-lg font-bold text-slate-900">Comments</h2>
      </div>

      <p className="mt-1 text-sm text-slate-500">
        Ask questions or share useful information about this paper.
      </p>

      <form onSubmit={handleAddComment} className="mt-5">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          maxLength={1000}
          rows={3}
          disabled={submitting}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">{content.length}/1000</span>

          <button
            type="submit"
            disabled={!content.trim() || submitting}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="mt-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl bg-slate-100 p-4"
              >
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center">
            <MessageCircle size={24} className="mx-auto text-slate-300" />

            <p className="mt-2 text-sm font-medium text-slate-500">
              No comments yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Be the first to comment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const isOwner = canModifyComment(comment);
              const isEditing = editingId === comment._id;

              return (
                <article
                  key={comment._id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {comment.user?.name || "User"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {comment.user?.email || ""}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {isOwner && !isEditing && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === comment._id ? null : comment._id,
                            )
                          }
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openMenuId === comment._id && (
                          <div className="absolute right-0 top-9 z-10 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                            <button
                              type="button"
                              onClick={() => startEditing(comment)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onDeleteComment(comment._id);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="mt-4">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        maxLength={1000}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      />

                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                        >
                          <X size={15} />
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdate(comment._id)}
                          disabled={!editingContent.trim()}
                          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          <Check size={15} />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                      {comment.content}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
