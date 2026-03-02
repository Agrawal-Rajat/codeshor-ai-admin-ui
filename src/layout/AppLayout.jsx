import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#111827",
          color: "white",
          padding: "20px",
        }}
      >
        <h3>Codeshor AI</h3>

        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin" style={linkStyle}>
              Overview
            </Link>
            <Link to="/admin/clients" style={linkStyle}>
              Clients
            </Link>
            <Link to="/admin/usage" style={linkStyle}>
              Usage
            </Link>
          </>
        )}

        {user?.role === "CLIENT" && (
          <>
            <Link to="/client" style={linkStyle}>
              Dashboard
            </Link>
            <Link to="/client/leads" style={linkStyle}>
              Leads
            </Link>
            <Link to="/client/conversations" style={linkStyle}>
              Conversations
            </Link>
            <Link to="/client/plan" style={linkStyle}>
              Plan
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
};

const linkStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  margin: "10px 0",
};

export default AppLayout;
