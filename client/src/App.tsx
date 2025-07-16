import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/homepage";
import Dashboard from "./pages/admin/dashboard";
import PrivateRoute from "./routes/privateRoute";
import UserProvider from "./context/userContext";
import Login from "./components/auth/login";

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
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
            
          </Routes>
        </Router>
      </main>
    </UserProvider>
  );
}

export default App;
