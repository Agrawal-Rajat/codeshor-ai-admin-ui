import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const ClientLeads = () => {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${API_BASE}/client/leads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setLeads(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch leads");
      }

      setLoading(false);
    };

    fetchLeads();
  }, [token]);

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading leads...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Leads Captured</h2>
      </div>

      {leads.length === 0 ? (
        <div className="glass-card">No leads captured yet.</div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Source</th>
                <th>Date Captured</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{lead.name || "-"}</td>
                  <td style={{ color: '#93c5fd' }}>{lead.email || "-"}</td>
                  <td>
                    <span className="badge badge-info">{lead.source}</span>
                  </td>
                  <td style={{ color: '#94a3b8' }}>{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientLeads;
