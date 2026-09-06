import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const MyUploadsStats = ({ stats }) => {
  const statCards = [
    {
      label: "Total Uploads",
      value: stats.total,
      icon: FileText,
      container: "border-slate-200 bg-white",
      iconColor: "text-slate-400",
      valueColor: "text-slate-900",
      labelColor: "text-slate-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      container: "border-yellow-200 bg-yellow-50",
      iconColor: "text-yellow-600",
      valueColor: "text-yellow-700",
      labelColor: "text-yellow-700",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      container: "border-green-200 bg-green-50",
      iconColor: "text-green-600",
      valueColor: "text-green-700",
      labelColor: "text-green-700",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      container: "border-red-200 bg-red-50",
      iconColor: "text-red-600",
      valueColor: "text-red-700",
      labelColor: "text-red-700",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`rounded-2xl border p-5 shadow-sm ${stat.container}`}
          >
            <div className="flex items-center justify-between">
              <Icon size={22} className={stat.iconColor} />

              <span
                className={`text-2xl font-bold ${stat.valueColor}`}
              >
                {stat.value}
              </span>
            </div>

            <p
              className={`mt-3 text-sm font-medium ${stat.labelColor}`}
            >
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MyUploadsStats;