import {
  MessageCircle,
  Sparkles,
} from "lucide-react";

const QuestionPaperAI = ({ onAskAI }) => {
  return (
    <div className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles
              size={19}
              className="text-blue-600"
            />

            <h2 className="font-bold text-slate-900">
              Need help with this paper?
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Open ChatGPT or Gemini to analyze or solve
            questions from this paper.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => onAskAI("chatgpt")}
            className="flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <MessageCircle size={17} />
            ChatGPT
          </button>

          <button
            type="button"
            onClick={() => onAskAI("gemini")}
            className="flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Sparkles size={17} />
            Gemini
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaperAI;