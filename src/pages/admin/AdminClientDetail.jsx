import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../config";

const AdminClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rebuilding, setRebuilding] = useState(false);
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/admin/clients/${client._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Client deleted successfully");
        navigate("/admin/clients");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to delete client");
    }
  };

  const handleRebuildEmbeddings = async () => {
    setRebuilding(true);

    try {
      const res = await fetch(
        `${API_BASE}/admin/clients/${id}/rebuild-embeddings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        const chunks = data.data?.chunksCount;
        alert(
          chunks || chunks === 0
            ? `Embeddings rebuilt successfully (${chunks} chunks).`
            : "Embeddings rebuilt successfully.",
        );
      } else {
        alert(data.message || "Failed to rebuild embeddings");
      }
    } catch (err) {
      alert("Failed to rebuild embeddings");
    } finally {
      setRebuilding(false);
    }
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setClient(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch client details");
      }

      setLoading(false);
    };

    fetchClient();
  }, [id, token]);

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading client...</div>;
  if (!client) return <div style={{ color: "white", padding: "2rem" }}>Client not found</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">{client.name}</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/admin/clients/${client._id}/edit`} style={{ textDecoration: 'none' }}>
            <button className="btn-primary">Edit Client</button>
          </Link>
          <button
            className="btn-secondary"
            onClick={handleRebuildEmbeddings}
            disabled={rebuilding}
            style={{ borderColor: "#f59e0b", color: "#fcd34d" }}
          >
            {rebuilding ? "Rebuilding..." : "Rebuild Embeddings"}
          </button>
          <button
            className="btn-secondary"
            onClick={handleDelete}
            style={{ borderColor: "#ef4444", color: "#fca5a5" }}
          >
            Delete Client
          </button>
        </div>
      </div>

      <div className="form-grid-3">
        <div className="glass-card">
          <h3 className="glass-card-title">Core Details</h3>
          <div className="form-group">
            <label className="form-label">Domain</label>
            <div style={{ color: "white", fontSize: "1.1rem" }}>{client.domain}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Plan</label>
            <div style={{ marginTop: "0.25rem" }}>
              <span className={`badge ${client.plan === 'AGENCY' ? 'badge-success' : 'badge-info'}`}>
                {client.plan}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <div style={{ marginTop: "0.25rem" }}>
              <span className={`badge ${client.isActive ? 'badge-success' : 'badge-danger'}`}>
                {client.isActive ? "Active" : "Suspended"}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h3 className="glass-card-title">Usage Statistics</h3>
          <div className="form-group">
            <label className="form-label">Monthly Limit</label>
            <div style={{ color: "white", fontSize: "1.1rem" }}>{client.usage?.monthlyChatLimit}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Used</label>
            <div style={{ color: "#fca5a5", fontSize: "1.1rem" }}>{client.usage?.monthlyChatsUsed}</div>
          </div>
        </div>

        <div className="glass-card">
          <h3 className="glass-card-title">Overall Stats</h3>
          <div className="form-group">
            <label className="form-label">Total Leads</label>
            <div style={{ color: "white", fontSize: "1.1rem" }}>{client.stats?.totalLeads}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Total Conversations</label>
            <div style={{ color: "white", fontSize: "1.1rem" }}>{client.stats?.totalConversations}</div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Business Profile</h3>
        {client.businessProfile ? (
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Services</label>
              <div style={{ color: "#cbd5e1", whiteSpace: "pre-wrap", lineHeight: 1.5, background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px" }}>
                {client.businessProfile.services || "Not provided"}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pricing</label>
              <div style={{ color: "#cbd5e1", whiteSpace: "pre-wrap", lineHeight: 1.5, background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px" }}>
                {client.businessProfile.pricing || "Not provided"}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Info</label>
              <div style={{ color: "#cbd5e1", lineHeight: 1.6, background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px" }}>
                <div><strong>Phone:</strong> {client.businessProfile.contactInfo?.phone}</div>
                <div><strong>Email:</strong> {client.businessProfile.contactInfo?.email}</div>
                <div><strong>Hours:</strong> {client.businessProfile.businessHours}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: "#94a3b8" }}>No business profile found. Client has not saved their profile yet.</div>
        )}
      </div>

      <div className="glass-card" style={{marginTop: "1.5rem"}}>
        <h3 className="glass-card-title">Widget Configuration</h3>
        {client.businessProfile?.widgetConfig ? (
            <div className="form-group">
              <label className="form-label">Default Questions</label>
              <div style={{ color: "#cbd5e1", lineHeight: 1.6, background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px" }}>
                {client.businessProfile.widgetConfig.defaultQuestions?.length > 0 ? (
                  client.businessProfile.widgetConfig.defaultQuestions.map((q, i) => (
                    <div key={i} style={{marginBottom: "10px"}}>
                      <strong>Q:</strong> {q.question}<br/>
                      <strong>A:</strong> {q.answer}
                    </div>
                  ))
                ) : (
                  <div>No default questions configured.</div>
                )}
              </div>
            </div>
        ) : (
          <div style={{ color: "#94a3b8" }}>No widget configuration found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminClientDetail;
