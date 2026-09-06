import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Repository from "./pages/Repository";
import QuestionPaperDetails from "./pages/QuestionPaperDetails";
import UploadQuestionPaper from "./pages/UploadQuestionPaper";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyUploads from "./pages/MyUploads";
import Bookmarks from "./pages/Bookmarks";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailToken from "./pages/VerifyEmailToken";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AdminPaperManagement from "./pages/AdminPaperManagement";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/papers" element={<AdminPaperManagement />} />
        </Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email/:token" element={<VerifyEmailToken />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/" element={<Home />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/question-papers/:id" element={<QuestionPaperDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-uploads"
          element={
            <ProtectedRoute>
              <MyUploads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadQuestionPaper />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
