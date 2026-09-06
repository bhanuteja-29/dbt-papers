import { ShieldCheck, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div className="mb-8 flex justify-between w-full">

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage submitted question papers.
          </p>
        </div>
      </div>

      <div>
        <Link
          to="/admin/papers"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Settings size={17} />
          Manage Papers
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
