import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import AuthForm from "./Components/Auth/Authform/Authform";
function App() {
  return (
    <>
        <Routes>
          <Route element={<PrivateRoute />}>
            
            <Route path="/" element={<h1>Home</h1>} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </>
  );
}

export default App;
