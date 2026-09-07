import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import UploadHeader from "../components/upload/UploadHeader";
import PaperInformationForm from "../components/upload/PaperInformationForm";
import FileUploadSection from "../components/upload/FileUploadSection";
import UploadMessages from "../components/upload/UploadMessages";
import UploadSubmit from "../components/upload/UploadSubmit";

const UploadQuestionPaper = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    course: "",
    courseCode: "",
    academicYear: "",
    examType: "",
    description: "",
    tags: "",
  });

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setError("");

    if (selectedFiles.length > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    const hasPDF = selectedFiles.some(
      (file) => file.type === "application/pdf"
    );

    const hasImage = selectedFiles.some(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png"
    );

    if (hasPDF && hasImage) {
      setError("You cannot mix a PDF with images.");
      return;
    }

    const pdfCount = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    ).length;

    if (pdfCount > 1) {
      setError("Only one PDF can be uploaded.");
      return;
    }

    const oversized = selectedFiles.find(
      (file) => file.size > 1024 * 1024 * 2
    );

    if (oversized) {
      setError(
        `${oversized.name} exceeds the 2 MB file limit.`
      );
      return;
    }

    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("course", form.course);
      formData.append("courseCode", form.courseCode);
      formData.append(
        "academicYear",
        form.academicYear
      );
      formData.append("examType", form.examType);
      formData.append(
        "description",
        form.description
      );
      formData.append("tags", form.tags);

      files.forEach((file) => {
        formData.append("files", file);
      });

      await api.post(
        "/question-papers",
        formData
      );

      setSuccess(
        "Question paper uploaded successfully!"
      );

      setTimeout(() => {
        navigate("/my-uploads");
      }, 1200);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to upload question paper."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <UploadHeader
          onBack={() => navigate("/repository")}
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <PaperInformationForm
            form={form}
            onChange={handleChange}
          />

          <FileUploadSection
            files={files}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
          />

          <UploadMessages
            error={error}
            success={success}
          />

          <UploadSubmit
            uploading={uploading}
          />
        </form>
      </main>
    </div>
  );
};

export default UploadQuestionPaper;