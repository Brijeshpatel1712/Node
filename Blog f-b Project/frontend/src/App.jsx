import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8080";

function App() {
  const [activeTab, setActiveTab] = useState("register"); // "register" | "login"

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          Auth Panel
        </h2>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            borderRadius: "999px",
            background: "#e5e7eb",
            padding: "4px",
          }}
        >
          <button
            onClick={() => setActiveTab("register")}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              background:
                activeTab === "register" ? "#ffffff" : "transparent",
              boxShadow:
                activeTab === "register"
                  ? "0 2px 8px rgba(0,0,0,0.12)"
                  : "none",
            }}
          >
            Register
          </button>
          <button
            onClick={() => setActiveTab("login")}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              background:
                activeTab === "login" ? "#ffffff" : "transparent",
              boxShadow:
                activeTab === "login"
                  ? "0 2px 8px rgba(0,0,0,0.12)"
                  : "none",
            }}
          >
            Login
          </button>
        </div>

        {activeTab === "register" ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

/* ---------- REGISTER FORM ---------- */

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = `${API_BASE}/api/auth/register`;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setType("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, formData);
      setType("success");
      setMessage(res.data.message || "User created successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setType("error");
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 style={{ marginBottom: "10px" }}>Create a new account</h3>

      {message && (
        <Alert message={message} type={type} />
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </>
  );
}

/* ---------- LOGIN FORM ---------- */

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = `${API_BASE}/api/auth/login`;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setType("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, formData);
      const { data: token, message } = res.data;

      // token store  
      localStorage.setItem("token", token);

      setType("success");
      setMessage(message || "Logged in successfully");
      setFormData({ email: "", password: "" });
    } catch (err) {
      setType("error");
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 style={{ marginBottom: "10px" }}>Login to your account</h3>

      {message && (
        <Alert message={message} type={type} />
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p
        style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
       
      </p>
    </>
  );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "4px",
          fontSize: "14px",
        }}
      >
        {label}
      </label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "9px 10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          outline: "none",
        }}
      />
    </div>
  );
}

function Alert({ message, type }) {
  const success = type === "success";
  return (
    <div
      style={{
        marginBottom: "12px",
        padding: "8px 10px",
        borderRadius: "8px",
        fontSize: "14px",
        backgroundColor: success ? "#dcfce7" : "#fee2e2",
        color: success ? "#166534" : "#991b1b",
        border: success ? "1px solid #22c55e" : "1px solid #f97373",
      }}
    >
      {message}
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "10px 0",
  borderRadius: "999px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  background: "linear-gradient(90deg, #2563eb, #16a34a)",
  color: "#ffffff",
};

export default App;
