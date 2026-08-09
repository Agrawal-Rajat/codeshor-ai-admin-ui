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

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`${API_BASE}/client/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      } else {
        alert(data.message || "Failed to delete lead");
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Error deleting lead");
    }
  };


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
                <th>Action</th>
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
                  <td>
                    <button 
                      className="btn-danger" 
                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "0.25rem", cursor: "pointer" }}
                      onClick={() => handleDeleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
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
