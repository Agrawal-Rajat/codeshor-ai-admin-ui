import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5500/api";

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

  if (loading) return <div>Loading clients...</div>;

  return (
    <div>
      <h2>All Clients</h2>

      <Link to="/admin/clients/create">
        <button>Create New Client</button>
      </Link>

      {clients.length === 0 ? (
        <div>No clients found</div>
      ) : (
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Domain</th>
              <th align="left">Plan</th>
              <th align="left">Status</th>
              <th align="left">Created</th>
              <th align="left">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>
                  <Link to={`/admin/clients/${client._id}`}>{client.name}</Link>
                </td>
                <td>{client.domain}</td>
                <td>{client.plan}</td>
                <td>{client.isActive ? "Active" : "Suspended"}</td>
                <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => toggleStatus(client._id)}>
                    {client.isActive ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminClients;
