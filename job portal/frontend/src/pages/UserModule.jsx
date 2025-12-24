import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserModule() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(data);
  }, []);

  return (
    <div className="page-box">
      <h2>User Module</h2>

      <div className="company-list">
        {companies.length === 0 && <p>No jobs available</p>}

        {companies.map((c, i) => (
          <div key={i} className="company-card">
            <h3>{c.name}</h3>
            <p>{c.role}</p>
            <p>📧 {c.email}</p>
            <p>🌐 {c.link}</p>
            <p>📍 {c.address}</p>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
