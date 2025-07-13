import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/homepage";
import PrivateRoute from "./routes/privateRoute";
import AdminLogin from "./pages/admin/adminLogin";
import Dashboard from "./pages/admin/dashboard";
import UserProvider from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <main className="min-h-screen w-full bg-neutral-50 dark:bg-[#0e100f]">
        <Router>
          <Routes>
            {/** Default Routes */}
            <Route path="/" element={<HomePage />} />

            <Route path="/admin-login" element={<AdminLogin />} />

            {/** Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </UserProvider>
  );
}

export default App;
