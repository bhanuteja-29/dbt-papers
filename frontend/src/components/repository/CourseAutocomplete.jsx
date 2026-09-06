import { useEffect, useRef, useState } from "react";

const CourseAutocomplete = ({
  options,
  value,
  selectedValue,
  onChange,
  onSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  const filteredOptions = options.filter((course) =>
    course.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block mb-1 font-medium">
        Course
      </label>

      <input
        type="text"
        value={value}
        placeholder="Search course"
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

      {showSuggestions && value.trim() && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-48 overflow-y-auto shadow">
          {filteredOptions.map((course) => (
            <button
              key={course}
              type="button"
              onClick={() => {
                onSelect(course);
                setShowSuggestions(false);
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {course}
            </button>
          ))}
        </div>
      )}

      {selectedValue && selectedValue !== value && (
        <p className="text-xs text-gray-500 mt-1">
          Selected: {selectedValue}
        </p>
      )}
    </div>
  );
};

export default CourseAutocomplete;