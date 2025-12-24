import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      email === "brijeshsangani78@gmail.com" &&
      password === "Brijesh@78599"
    ) {
      navigate("/admin-panel");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="box">
      <h2>Admin Login</h2>

      <input
        placeholder="Admin Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
