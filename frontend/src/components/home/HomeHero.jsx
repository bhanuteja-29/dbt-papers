import { Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
            VIT-AP University Question Paper Repository
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find the right
            <span className="text-blue-600"> question paper </span>
            <br className="hidden sm:block" />
            for your preparation.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Search, view, download and bookmark previous year question papers
            from your university — all in one place.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() => navigate("/repository")}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Search size={18} />
              Browse Question Papers
            </button>

            <button
              type="button"
              onClick={() => navigate("/upload")}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Upload size={18} />
              Upload a Paper
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeHero;