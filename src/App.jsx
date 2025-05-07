import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import VerifyAdminCode from './pages/VerifyAdminCode';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-admin" element={<VerifyAdminCode />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {localStorage.getItem("adminVerified") === "true" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/verify-admin" />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}