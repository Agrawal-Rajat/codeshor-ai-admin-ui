import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:5500/api";

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

  if (loading) return <div>Loading dashboard...</div>;

  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h2>Client Dashboard</h2>

      <div style={cardStyle}>
        <strong>Plan:</strong> {data.plan}
      </div>

      <div style={cardStyle}>
        <strong>Total Leads:</strong> {data.totalLeads}
      </div>

      <div style={cardStyle}>
        <strong>Total Conversations:</strong> {data.totalConversations}
      </div>

      <div style={cardStyle}>
        <strong>Monthly Chat Limit:</strong> {data.monthlyChatLimit}
      </div>

      <div style={cardStyle}>
        <strong>Chats Used:</strong> {data.monthlyChatsUsed}
      </div>

      <div style={cardStyle}>
        <strong>Remaining Chats:</strong> {data.remainingChats}
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

export default ClientDashboard;
