import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import API_BASE from "../../config";

 
const AdminClients = () => {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setClients(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch clients");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await fetch(`${API_BASE}/admin/clients/${id}/toggle-status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchClients();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading clients...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">All Clients</h2>
        <Link to="/admin/clients/create" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">+ Create New Client</button>
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="glass-card">No clients found</div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Domain</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>
                    <Link to={`/admin/clients/${client._id}`} style={{ color: '#a5b4fc', fontWeight: 600, textDecoration: 'none' }}>
                      {client.name}
                    </Link>
                  </td>
                  <td>{client.domain}</td>
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
                  <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => toggleStatus(client._id)}>
                      {client.isActive ? "Suspend" : "Activate"}
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

export default AdminClients;
