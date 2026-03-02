import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5500/api";

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

  if (loading) return <div>Loading conversations...</div>;

  return (
    <div>
      <h2>Conversations</h2>

      {conversations.length === 0 ? (
        <div>No conversations yet</div>
      ) : (
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th align="left">Lead Name</th>
              <th align="left">Email</th>
              <th align="left">Session ID</th>
              <th align="left">Date</th>
              <th align="left">View</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv) => (
              <tr key={conv.sessionId}>
                <td>{conv.leadName}</td>
                <td>{conv.leadEmail}</td>
                <td>{conv.sessionId}</td>
                <td>{new Date(conv.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/client/conversations/${conv.sessionId}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientConversations;
