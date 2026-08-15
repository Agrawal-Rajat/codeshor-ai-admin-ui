import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const ClientKnowledgeGaps = () => {
  const { token } = useAuth();
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [deleting, setDeleting] = useState({});

  useEffect(() => {
    fetchGaps();
  }, [token]);

  const fetchGaps = async () => {
    try {
      const res = await fetch(`${API_BASE}/client/knowledge-gaps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        setGaps(result.data);
      }
    } catch (err) {
      console.error("Gaps fetch failed", err);
    }
    setLoading(false);
  };

  const handleAnswerChange = (id, text) => {
    setAnswers((prev) => ({ ...prev, [id]: text }));
  };

  const submitAnswer = async (id) => {
    const answer = answers[id];
    if (!answer?.trim()) return;

    setSubmitting((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`${API_BASE}/client/knowledge-gaps/${id}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answer }),
      });

      const result = await res.json();

      if (result.success) {
        // Remove the answered gap from the list
        setGaps((prev) => prev.filter((gap) => gap._id !== id));
      } else {
        alert(result.message || "Failed to submit answer");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting answer");
    }

    setSubmitting((prev) => ({ ...prev, [id]: false }));
  };

  const handleDeleteGap = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    setDeleting((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`${API_BASE}/client/knowledge-gaps/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        setGaps((prev) => prev.filter((gap) => gap._id !== id));
      } else {
        alert(result.message || "Failed to delete question");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting question");
    }

    setDeleting((prev) => ({ ...prev, [id]: false }));
  };

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading knowledge gaps...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Knowledge Gaps (Unanswered Questions)</h2>
      </div>
      
      <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "1.05rem" }}>
        These are questions your AI couldn't answer. Provide an answer below to train the AI instantly, or delete non-relevant questions.
      </p>

      {gaps.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem" }}>
          <h3 style={{ color: "#4ade80", marginBottom: "0.5rem" }}>All Caught Up!</h3>
          <p style={{ color: "#94a3b8", margin: 0 }}>There are no pending questions for your AI to learn.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {gaps.map((gap) => (
            <div key={gap._id} className="glass-card" style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f1f5f9" }}>
                  <span style={{ color: "#818cf8", marginRight: "0.5rem" }}>Q:</span> 
                  {gap.question}
                </div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>
                  {new Date(gap.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <textarea
                  className="form-textarea"
                  placeholder="Type the answer here to train the AI..."
                  value={answers[gap._id] || ""}
                  onChange={(e) => handleAnswerChange(gap._id, e.target.value)}
                  style={{ minHeight: "80px" }}
                />
              </div>
              
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => handleDeleteGap(gap._id)}
                  disabled={deleting[gap._id] || submitting[gap._id]}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: (deleting[gap._id] || submitting[gap._id]) ? "not-allowed" : "pointer",
                    opacity: (deleting[gap._id] || submitting[gap._id]) ? 0.6 : 1,
                  }}
                >
                  {deleting[gap._id] ? "Deleting..." : "Delete Question"}
                </button>
                <button
                  className="btn-primary"
                  onClick={() => submitAnswer(gap._id)}
                  disabled={submitting[gap._id] || deleting[gap._id] || !answers[gap._id]?.trim()}
                  style={{
                    opacity: (submitting[gap._id] || deleting[gap._id] || !answers[gap._id]?.trim()) ? 0.6 : 1,
                    cursor: (submitting[gap._id] || deleting[gap._id] || !answers[gap._id]?.trim()) ? "not-allowed" : "pointer"
                  }}
                >
                  {submitting[gap._id] ? "Training..." : "Submit Answer"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientKnowledgeGaps;
