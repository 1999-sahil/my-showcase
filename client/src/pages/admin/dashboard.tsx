import Navbar from "@/components/navbar/navbar";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    <div>
      <Navbar />

      <button onClick={handleLogout} className="mt-20">Logout</button>
    </div>
  )
}

export default Dashboard