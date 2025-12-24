import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JobList() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(data.filter(c => c.role === role));
  }, [role]);

  return (
    <div className="page-box">
      <h2 className="job-title">{role}</h2>

      <div className="company-list">
        {companies.length === 0 && <p>No jobs added</p>}

        {companies.map((c, i) => (
          <div key={i} className="company-card">
            <h3>{c.name}</h3>

            {/* ✅ CLICKABLE EMAIL */}
            <p>
              📧{" "}
              <a
                href={`mailto:${c.email}`}
                className="job-link"
              >
                {c.email}
              </a>
            </p>

            {/* ✅ CLICKABLE WEBSITE */}
            <p>
              🌐{" "}
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="job-link"
              >
                {c.link}
              </a>
            </p>

            <p>📍 {c.address}</p>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
