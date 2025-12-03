import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="user-menu">
      <span className="user-name">Welcome, {user.username}</span>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
