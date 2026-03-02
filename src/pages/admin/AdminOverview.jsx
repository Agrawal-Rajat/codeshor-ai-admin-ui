import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:5500/api";

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

  if (loading) return <div>Loading overview...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h2>Admin Overview</h2>

      <div style={cardStyle}>
        <strong>Total Clients:</strong> {data.totalClients}
      </div>

      <div style={cardStyle}>
        <strong>Active Clients:</strong> {data.activeClients}
      </div>

      <div style={cardStyle}>
        <strong>Total Chats Used:</strong> {data.totalChatsUsed}
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#f3f4f6",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "6px",
};

export default AdminOverview;
