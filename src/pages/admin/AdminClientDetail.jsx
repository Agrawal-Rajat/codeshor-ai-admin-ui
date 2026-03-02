import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5500/api";

const AdminClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div>Loading client...</div>;
  if (!client) return <div>Client not found</div>;

  return (
    <div>
      <Link to={`/admin/clients/${client._id}/edit`}>
        <button>Edit Client</button>
      </Link>
      <button
        onClick={handleDelete}
        style={{
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
        }}
      >
        Delete Client
      </button>
      <h2>{client.name}</h2>

      <div style={cardStyle}>
        <strong>Domain:</strong> {client.domain}
      </div>

      <div style={cardStyle}>
        <strong>Plan:</strong> {client.plan}
      </div>

      <div style={cardStyle}>
        <strong>Status:</strong> {client.isActive ? "Active" : "Suspended"}
      </div>

      <div style={cardStyle}>
        <strong>Monthly Limit:</strong> {client.usage?.monthlyChatLimit}
      </div>

      <div style={cardStyle}>
        <strong>Used:</strong> {client.usage?.monthlyChatsUsed}
      </div>

      <div style={cardStyle}>
        <strong>Total Leads:</strong> {client.stats?.totalLeads}
      </div>

      <div style={cardStyle}>
        <strong>Total Conversations:</strong> {client.stats?.totalConversations}
      </div>

      <h3>Business Profile</h3>

      {client.businessProfile ? (
        <div style={cardStyle}>
          <div>
            <strong>Services:</strong> {client.businessProfile.services}
          </div>

          <div>
            <strong>Pricing:</strong> {client.businessProfile.pricing}
          </div>

          <div>
            <strong>Business Hours:</strong>{" "}
            {client.businessProfile.businessHours}
          </div>

          <div>
            <strong>Phone:</strong> {client.businessProfile.contactInfo?.phone}
          </div>

          <div>
            <strong>Email:</strong> {client.businessProfile.contactInfo?.email}
          </div>
        </div>
      ) : (
        <div>No business profile found</div>
      )}
    </div>
  );
};

const cardStyle = {
  background: "#f3f4f6",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "6px",
};

export default AdminClientDetail;
