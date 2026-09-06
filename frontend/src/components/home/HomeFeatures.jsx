import {
  Search,
  Bookmark,
  Upload,
  ShieldCheck,
} from "lucide-react";

const HomeFeatures = () => {
  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description:
        "Find papers quickly using course, course code, academic year and exam type.",
    },
    {
      icon: Bookmark,
      title: "Save Papers",
      description:
        "Bookmark useful question papers and access them whenever you need.",
    },
    {
      icon: Upload,
      title: "Contribute",
      description:
        "Upload previous year papers and help other students prepare better.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Papers",
      description:
        "Uploaded papers go through an approval process before appearing in the repository.",
    },
  ];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-blue-600">
            Everything you need
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Built for smarter exam preparation
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            A simple platform for discovering and sharing university
            question papers.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeFeatures;