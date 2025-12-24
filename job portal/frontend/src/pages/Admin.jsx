import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="box">
      <h2>Admin Panel</h2>
      <p>Welcome Admin</p>

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}
