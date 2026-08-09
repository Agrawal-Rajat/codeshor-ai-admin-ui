import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const AdminUsage = () => {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Top-Up Modal State
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [topUpData, setTopUpData] = useState({ textTopUp: 0, voiceTopUp: 0 });
  const [topUpLoading, setTopUpLoading] = useState(false);

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

  useEffect(() => {
    fetchUsage();
  }, [token]);

  const openTopUpModal = (client) => {
    setSelectedClient(client);
    setTopUpData({ textTopUp: 0, voiceTopUp: 0 });
    setIsTopUpOpen(true);
  };

  const handleTopUpSubmit = async (e) => {
    e.preventDefault();
    setTopUpLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/clients/${selectedClient.id}/topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          textTopUp: parseInt(topUpData.textTopUp) || 0,
          voiceTopUp: parseInt(topUpData.voiceTopUp) || 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Top-up applied successfully!");
        setIsTopUpOpen(false);
        fetchUsage(); // Refresh the table
      } else {
        alert(data.message || "Failed to apply top-up.");
      }
    } catch (err) {
      alert("An error occurred during top-up.");
    } finally {
      setTopUpLoading(false);
    }
  };

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
                <th>Text Limit</th>
                <th>Text Used</th>
                <th>Voice Limit</th>
                <th>Voice Used</th>
                <th>AI Cost (INR)</th>
                <th>Action</th>
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
                  <td>{client.monthlyChatLimit}</td>
                  <td style={{ color: client.remainingChats < 50 ? '#fca5a5' : '#86efac' }}>
                    {client.monthlyChatsUsed} 
                  </td>
                  <td>{client.monthlyVoiceLimit}</td>
                  <td style={{ color: client.remainingVoice < 10 ? '#fca5a5' : '#86efac' }}>
                    {client.monthlyVoiceUsed} 
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>₹{(client.totalCostINR || 0).toFixed(4)}</td>
                  <td>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                      onClick={() => openTopUpModal(client)}
                    >
                      Top Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Top Up Modal */}
      {isTopUpOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '400px' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Top Up: {selectedClient?.name}</h3>
            <form onSubmit={handleTopUpSubmit}>
              <div className="form-group">
                <label>Add Text Messages Limit</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  value={topUpData.textTopUp}
                  onChange={(e) => setTopUpData({ ...topUpData, textTopUp: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Add Voice Messages Limit</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  value={topUpData.voiceTopUp}
                  onChange={(e) => setTopUpData({ ...topUpData, voiceTopUp: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary" disabled={topUpLoading}>
                  {topUpLoading ? "Applying..." : "Apply Top-Up"}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setIsTopUpOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsage;
