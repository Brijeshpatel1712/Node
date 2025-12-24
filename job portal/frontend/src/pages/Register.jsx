import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: ""
  });

  const submit = async () => {
    if (!form.fullname || !form.email || !form.phone || !form.password) {
      alert("All fields required");
      return;
    }

    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    navigate("/login");
  };

  return (
    <div className="box">
      <h2>Register</h2>

      <input placeholder="Full Name"
        onChange={e => setForm({ ...form, fullname: e.target.value })} />

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Phone"
        onChange={e => setForm({ ...form, phone: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={submit}>Register</button>

      <p onClick={() => navigate("/login")}>
        Already have account? Login
      </p>
    </div>
  );
}
