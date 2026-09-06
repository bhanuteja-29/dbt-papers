const PaperInformationForm = ({ form, onChange }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Paper Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the details of the question paper.
        </p>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="e.g. DBMS FAT Question Paper"
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Course + Code */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Course
            </label>

            <input
              name="course"
              value={form.course}
              onChange={onChange}
              placeholder="Database Management Systems"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Course Code
            </label>

            <input
              name="courseCode"
              value={form.courseCode}
              onChange={onChange}
              placeholder="CSE2007"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Year + Exam */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Academic Year
            </label>

            <input
              name="academicYear"
              value={form.academicYear}
              onChange={onChange}
              placeholder="2025-26"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Exam Type
            </label>

            <select
              name="examType"
              value={form.examType}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="">Select exam type</option>
              <option value="CAT1">CAT 1</option>
              <option value="CAT2">CAT 2</option>
              <option value="FAT">FAT</option>
              <option value="Midterm">Midterm</option>
              <option value="End Semester">
                End Semester
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Description
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            placeholder="Add any useful information about this paper..."
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Tags
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <input
            name="tags"
            value={form.tags}
            onChange={onChange}
            placeholder="dbms, sql, database"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>
    </section>
  );
};

export default PaperInformationForm;