import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      label: "Total Papers",
      value: stats.total,
      icon: FileText,
      className: "border-slate-200 bg-white",
      iconClass: "text-slate-400",
      valueClass: "text-slate-900",
      labelClass: "text-slate-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      className: "border-yellow-200 bg-yellow-50",
      iconClass: "text-yellow-600",
      valueClass: "text-yellow-700",
      labelClass: "text-yellow-700",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      className: "border-green-200 bg-green-50",
      iconClass: "text-green-600",
      valueClass: "text-green-700",
      labelClass: "text-green-700",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      className: "border-red-200 bg-red-50",
      iconClass: "text-red-600",
      valueClass: "text-red-700",
      labelClass: "text-red-700",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`rounded-2xl border p-5 shadow-sm ${stat.className}`}
          >
            <div className="flex items-center justify-between">
              <Icon size={22} className={stat.iconClass} />

              <span
                className={`text-2xl font-bold ${stat.valueClass}`}
              >
                {stat.value}
              </span>
            </div>

            <p
              className={`mt-3 text-sm font-medium ${stat.labelClass}`}
            >
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;