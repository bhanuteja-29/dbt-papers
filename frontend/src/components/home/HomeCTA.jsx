import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-10">

          <h2 className="text-3xl font-bold text-white">
            Have a question paper to share?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Help your fellow students by contributing papers to the
            repository.
          </p>

          <button
            type="button"
            onClick={() => navigate("/upload")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Upload a Paper
            <ArrowRight size={17} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default HomeCTA;