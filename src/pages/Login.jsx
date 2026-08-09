import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import API_BASE from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Login failed");
      return;
    }

    login(data.token, data.user);

    if (data.user.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/client");
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h2 className="admin-page-title" style={{ textAlign: "center", marginBottom: "2rem" }}>Codeshor AI</h2>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            placeholder="admin@codeshor.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "2rem" }}>
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
