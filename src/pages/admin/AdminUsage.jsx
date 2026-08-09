import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

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

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading usage...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Client Usage Analytics</h2>
      </div>

      {clients.length === 0 ? (
        <div className="glass-card">No clients found</div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Limit</th>
                <th>Used</th>
                <th>Remaining</th>
                <th>Tokens</th>
                <th>AI Cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{client.name}</td>
                  <td>
                    <span className={`badge ${client.plan === 'AGENCY' ? 'badge-success' : 'badge-info'}`}>
                      {client.plan}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${client.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {client.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td>{client.monthlyChatLimit}</td>
                  <td style={{ color: '#fca5a5' }}>{client.monthlyChatsUsed}</td>
                  <td style={{ color: '#86efac' }}>{client.remainingChats}</td>
                  <td style={{ fontFamily: 'monospace' }}>{client.totalTokensUsed}</td>
                  <td>₹{(client.totalCostINR || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsage;
