import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "https://codeshor-ai-backend.onrender.com/api";

const ConversationDetail = () => {
  const { sessionId } = useParams();
  const { token } = useAuth();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/client/conversations/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          setConversation(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch conversation");
      }

      setLoading(false);
    };

    fetchConversation();
  }, [sessionId, token]);

  if (loading) return <div>Loading conversation...</div>;
  if (!conversation) return <div>Conversation not found</div>;

  return (
    <div>
      <h2>Conversation Detail</h2>

      {conversation.messages.map((msg, index) => (
        <div
          key={index}
          style={{
            background: msg.role === "user" ? "#dbeafe" : "#f3f4f6",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "6px",
          }}
        >
          <strong>{msg.role.toUpperCase()}:</strong>
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ConversationDetail;
