import { useNavigate } from "react-router-dom";

const roles = [
  "Front Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI-UX Developer",
  "AI-ML Developer",
  "Software Developer",
  "Web Developer",
  "Mobile Developer",
  "Database Developer"
];

export default function JobModule() {
  const navigate = useNavigate();

  return (
    <div className="box">
      <h2>Job Module</h2>

      <div className="job-grid">
        {roles.map(role => (
          <button
            key={role}
            className="job-btn"
            onClick={() => navigate(`/jobs/${role}`)}
          >
            {role}
          </button>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
