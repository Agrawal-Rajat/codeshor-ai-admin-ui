import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const ClientDashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE}/client/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Dashboard fetch failed");
      }

      setLoading(false);
    };

    fetchDashboard();
  }, [token]);

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading dashboard...</div>;
  if (!data) return <div style={{ color: "white", padding: "2rem" }}>No data available</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Client Dashboard</h2>
        <span className={`badge ${data.plan === 'AGENCY' ? 'badge-success' : 'badge-info'}`}>
          {data.plan} PLAN
        </span>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Performance Overview</h3>
        <div className="form-grid-2">
          <div className="stat-card">
            <span className="stat-label">Total Campaign Submissions</span>
            <span className="stat-value" style={{ color: "#818cf8" }}>{data.totalLeads}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Conversations</span>
            <span className="stat-value">{data.totalConversations}</span>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Monthly Text Chat Usage</h3>
        <div className="form-grid-3">
          <div className="stat-card">
            <span className="stat-label">Text Limit</span>
            <span className="stat-value" style={{ fontSize: "1.5rem" }}>{data.monthlyChatLimit}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Text Chats Used</span>
            <span className="stat-value" style={{ fontSize: "1.5rem", color: "#fca5a5" }}>{data.monthlyChatsUsed}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Remaining</span>
            <span className="stat-value" style={{ fontSize: "1.5rem", color: "#86efac" }}>{data.remainingChats}</span>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Monthly Voice Chat Usage</h3>
        <div className="form-grid-3">
          <div className="stat-card">
            <span className="stat-label">Voice Limit</span>
            <span className="stat-value" style={{ fontSize: "1.5rem" }}>{data.monthlyVoiceLimit}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Voice Chats Used</span>
            <span className="stat-value" style={{ fontSize: "1.5rem", color: "#fca5a5" }}>{data.monthlyVoiceUsed}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Remaining</span>
            <span className="stat-value" style={{ fontSize: "1.5rem", color: "#86efac" }}>{data.remainingVoice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
