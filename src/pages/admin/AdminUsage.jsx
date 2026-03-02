import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:5500/api";

const AdminUsage = () => {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/analytics/usage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setClients(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch usage");
      }

      setLoading(false);
    };

    fetchUsage();
  }, [token]);

  if (loading) return <div>Loading usage...</div>;

  return (
    <div>
      <h2>Client Usage Analytics</h2>

      {clients.length === 0 ? (
        <div>No clients found</div>
      ) : (
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Plan</th>
              <th align="left">Status</th>
              <th align="left">Limit</th>
              <th align="left">Used</th>
              <th align="left">Remaining</th>
              <th align="left">Tokens</th>
              <th align="left">AI Cost (USD)</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.plan}</td>
                <td>{client.isActive ? "Active" : "Suspended"}</td>
                <td>{client.monthlyChatLimit}</td>
                <td>{client.monthlyChatsUsed}</td>
                <td>{client.remainingChats}</td>
                <td>{client.totalTokensUsed}</td>
                <td>₹{(client.totalCostINR || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsage;
