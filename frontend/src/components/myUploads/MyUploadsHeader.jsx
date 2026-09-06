import { Upload } from "lucide-react";

const MyUploadsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <Upload size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Uploaded Papers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track the question papers you have uploaded.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyUploadsHeader;