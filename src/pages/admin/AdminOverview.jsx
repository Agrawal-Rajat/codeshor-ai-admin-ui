import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const AdminOverview = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/analytics/overview`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch overview");
      }

      setLoading(false);
    };

    fetchOverview();
  }, [token]);

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading overview...</div>;
  if (!data) return <div style={{ color: "white", padding: "2rem" }}>No data available</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Admin Overview</h2>
      </div>

      <div className="form-grid-3">
        <div className="stat-card">
          <span className="stat-label">Total Clients</span>
          <span className="stat-value">{data.totalClients}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Active Clients</span>
          <span className="stat-value">{data.activeClients}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Chats Used</span>
          <span className="stat-value">{data.totalChatsUsed}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
