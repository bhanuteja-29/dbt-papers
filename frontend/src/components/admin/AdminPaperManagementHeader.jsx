import { FileCheck, FileX } from "lucide-react";

const AdminPaperManagementHeader = ({
  activeStatus,
  onStatusChange,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Paper Management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage approved and rejected question papers.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onStatusChange("approved")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition ${
            activeStatus === "approved"
              ? "bg-green-600 text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FileCheck size={18} />
          Approved
        </button>

        <button
          type="button"
          onClick={() => onStatusChange("rejected")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition ${
            activeStatus === "rejected"
              ? "bg-red-600 text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FileX size={18} />
          Rejected
        </button>
      </div>
    </div>
  );
};

export default AdminPaperManagementHeader;