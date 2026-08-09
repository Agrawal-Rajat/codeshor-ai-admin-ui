import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import API_BASE from "../../config";

const ClientConversations = () => {
  const { token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${API_BASE}/client/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setConversations(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch conversations");
      }

      setLoading(false);
    };

    fetchConversations();
  }, [token]);

  const handleDeleteConversation = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;
    try {
      const res = await fetch(`${API_BASE}/client/conversations/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setConversations((prev) => prev.filter((c) => c.sessionId !== sessionId));
      } else {
        alert(data.message || "Failed to delete conversation");
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
      alert("Error deleting conversation");
    }
  };


  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading conversations...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Chat Conversations</h2>
      </div>

      {conversations.length === 0 ? (
        <div className="glass-card">No conversations yet</div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Email</th>
                <th>Session ID</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conv) => (
                <tr key={conv.sessionId}>
                  <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{conv.leadName || "Anonymous"}</td>
                  <td style={{ color: '#93c5fd' }}>{conv.leadEmail || "-"}</td>
                  <td style={{ fontFamily: 'monospace', color: '#94a3b8' }}>{conv.sessionId.substring(0, 8)}...</td>
                  <td style={{ color: '#94a3b8' }}>{new Date(conv.createdAt).toLocaleString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link to={`/client/conversations/${conv.sessionId}`}>
                        <button className="btn-secondary" style={{ padding: "0.5rem 1rem" }}>View Chat</button>
                      </Link>
                      <button 
                        className="btn-danger" 
                        style={{ padding: "0.5rem 1rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "0.25rem", cursor: "pointer" }}
                        onClick={() => handleDeleteConversation(conv.sessionId)}
                      >
                        Delete
                      </button>
                    </div>
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

export default ClientConversations;
