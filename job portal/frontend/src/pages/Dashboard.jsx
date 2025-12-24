import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="box">
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/admin")}>Admin</button>
      <button onClick={() => navigate("/jobs")}>Job Module</button>
      <button onClick={() => navigate("/user")}>User Module</button>

      <button className="logout-btn" onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}
