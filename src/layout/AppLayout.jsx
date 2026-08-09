import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-layout-wrapper">
      {/* Sidebar */}
      <div className="glass-sidebar">
        <h3 className="sidebar-title">Codeshor AI</h3>

        {user?.role === "ADMIN" && (
          <div style={{ flex: 1 }}>
            <NavLink to="/admin" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Overview
            </NavLink>
            <NavLink to="/admin/clients" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Clients
            </NavLink>
            <NavLink to="/admin/usage" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Usage
            </NavLink>
          </div>
        )}

        {user?.role === "CLIENT" && (
          <div style={{ flex: 1 }}>
            <NavLink to="/client" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
            <NavLink to="/client/leads" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Leads
            </NavLink>
            <NavLink to="/client/conversations" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Conversations
            </NavLink>
            <NavLink to="/client/knowledge-gaps" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Knowledge Gaps
            </NavLink>
            <NavLink to="/client/plan" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Plan
            </NavLink>
            <NavLink to="/client/widget" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              Widget Settings
            </NavLink>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
