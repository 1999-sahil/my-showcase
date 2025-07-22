import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/homepage";
import PrivateRoute from "./routes/privateRoute";
import UserProvider from "./context/userContext";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/dashboard";

import DashboardLayout from "./pages/admin/dashboardLayout";
import Blogs from "./pages/admin/blogs";
import Notes from "./pages/admin/notes";
import Projects from "./pages/admin/projects";
import Draft from "./pages/admin/draft";
import Settings from "./pages/admin/settings";

function App() {
  return (
    <UserProvider>
      <main className="min-h-screen w-full bg-neutral-50 dark:bg-[#0e100f]">
        <Router>
          <Routes>
            {/** Default Routes */}
            <Route path="/" element={<HomePage />} />

            <Route path="/admin-login" element={<Login />} />

            {/** Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="notes" element={<Notes />} />
                <Route path="projects" element={<Projects />} />
                <Route path="draft" element={<Draft />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </main>
    </UserProvider>
  );
}

export default App;
