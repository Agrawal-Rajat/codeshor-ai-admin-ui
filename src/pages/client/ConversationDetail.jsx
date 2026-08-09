import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

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

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading conversation...</div>;
  if (!conversation) return <div style={{ color: "white", padding: "2rem" }}>Conversation not found</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Conversation Thread</h2>
        <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          Session: <span style={{ color: "#f1f5f9", fontFamily: "monospace" }}>{sessionId}</span>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxHeight: "60vh",
          overflowY: "auto",
          paddingRight: "1rem"
        }}>
          {conversation.messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}
              >
                <span style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: 600,
                  color: "#94a3b8",
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  textTransform: "uppercase"
                }}>
                  {isUser ? (conversation.leadName || "Lead") : "AI Assistant"}
                </span>
                <div
                  style={{
                    background: isUser ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "rgba(15, 23, 42, 0.8)",
                    color: isUser ? "white" : "#f1f5f9",
                    padding: "1rem 1.25rem",
                    borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    border: isUser ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                    lineHeight: 1.5,
                    fontSize: "0.95rem",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
