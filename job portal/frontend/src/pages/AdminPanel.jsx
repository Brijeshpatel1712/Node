import { useEffect, useState } from "react";
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

export default function AdminPanel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: roles[0],
    name: "",
    email: "",
    link: "",
    address: ""
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(data);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("companies", JSON.stringify(data));
    setCompanies(data);
  };

  const addCompany = () => {
    if (!form.name || !form.email || !form.link || !form.address) {
      alert("All fields required");
      return;
    }

    const updated = [...companies, form];
    saveToStorage(updated);

    setForm({
      role: roles[0],
      name: "",
      email: "",
      link: "",
      address: ""
    });
  };

  const deleteCompany = (index) => {
    const updated = companies.filter((_, i) => i !== index);
    saveToStorage(updated);
  };

  return (
    <div className="page-box">
      <h2>Admin Panel</h2>

      {/* ADD FORM */}
      <div className="company-card">
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <input placeholder="Company Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input placeholder="Website"
          value={form.link}
          onChange={e => setForm({ ...form, link: e.target.value })}
        />

        <input placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />

        <button onClick={addCompany}>Add Company</button>
      </div>

      {/* LIST */}
      <div className="company-list">
        {companies.map((c, i) => (
          <div key={i} className="company-card">
            <h3>{c.name}</h3>
            <p>{c.role}</p>
            <p>{c.email}</p>
            <p>{c.link}</p>
            <p>{c.address}</p>

            <button className="logout-btn" onClick={() => deleteCompany(i)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back
      </button>
    </div>
  );
}
