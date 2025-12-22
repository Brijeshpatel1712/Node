import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="card-box">
        <button onClick={() => navigate("/company")}>Company Module</button>
        <button onClick={() => navigate("/job")}>Job Module</button>
        <button onClick={() => navigate("/user")}>User Module</button>
      </div>

      <button className="back" onClick={() => navigate("/login")}>
        Back
      </button>
    </div>
  );
};

export default Dashboard;
