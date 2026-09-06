import { FileText, Users, Download, BookOpen } from "lucide-react";

const HomeStats = () => {
  const stats = [
    {
      label: "Question Papers",
      value: "100+",
      icon: FileText,
    },
    {
      label: "Courses",
      value: "20+",
      icon: BookOpen,
    },
    {
      label: "Students",
      value: "500+",
      icon: Users,
    },
    {
      label: "Downloads",
      value: "1K+",
      icon: Download,
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center border-slate-200 px-4 py-7 text-center sm:border-r last:border-r-0"
            >
              <Icon size={22} className="text-blue-600" />

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeStats;