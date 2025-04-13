import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import AuthForm from "./Components/Auth/Authform/Authform";
import AdminRegisterForm from "./Components/Enterprise/Admin/Views/AdminRegisterForm";
import AdminLoginForm from "./Components/Enterprise/Admin/Views/AdminLoginForm";
import AdminRoutes from "./Routes/AdminRoutes";
import Dashboard from "./Components/Dashboard/Views/Dashboard";
import CoursesPage from "./Components/Courses/Views/Course";
import TrainersPage from "./Components/Capacitation/Views/Capacitation";
import CatalogPage from "./Components/Catalog/Views/Catalog";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/enterprise" element={<h1>Home</h1>} />
          <Route
            path="/enterprise/information"
            element={<h1>Information</h1>}
          />
          <Route path="/enterprise/adminlogin" element={<AdminLoginForm />} />
          <Route path="/enterprise/create-admin" element={<AdminRegisterForm />} />
        </Route>

        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/create-admin" element={<AdminRegisterForm />} />
          <Route path="/admin/cursos" element={<CoursesPage />} />
          <Route path="/admin/capacitadores" element={<TrainersPage />} />
          <Route path="/admin/catalogo" element={<CatalogPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/enterprise" />} />
      </Routes>
    </>
  );
}

export default App;
