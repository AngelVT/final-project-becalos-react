import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MapPage from "./pages/MapPage";
import RegisterPoint from "./pages/RegisterPoint";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<MapPage />} />

          {/* Protected Routes */}
          <Route
            path="/register-point"
            element={
              <PrivateRoute>
                <RegisterPoint />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<MapPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;