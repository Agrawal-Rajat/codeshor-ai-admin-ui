import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const ClientCampaigns = () => {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState("campaigns"); // "campaigns" | "submissions"
    const [campaigns, setCampaigns] = useState([]);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);

    // Form state
    const [title, setTitle] = useState("");
    const [triggerText, setTriggerText] = useState("");
    const [description, setDescription] = useState("");
    const [thankYouMessage, setThankYouMessage] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [questions, setQuestions] = useState([
        { id: "1", questionText: "", replyType: "text", options: [""] }
    ]);

    const [filterCampaignId, setFilterCampaignId] = useState("");
    const [expandedResponseId, setExpandedResponseId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cRes, rRes] = await Promise.all([
                fetch(`${API_BASE}/client/campaigns`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API_BASE}/client/campaign-responses`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const cData = await cRes.json();
            const rData = await rRes.json();

            if (cData.success) setCampaigns(cData.data);
            if (rData.success) setResponses(rData.data);
        } catch (err) {
            console.error("Failed to load campaigns/responses", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const resetForm = () => {
        setTitle("");
        setTriggerText("");
        setDescription("");
        setThankYouMessage("Thank you for completing the questions! How else can I assist you today?");
        setIsActive(true);
        setQuestions([{ id: "1", questionText: "", replyType: "text", options: [""] }]);
        setEditingCampaign(null);
    };

    const handleOpenCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const handleOpenEditModal = (campaign) => {
        setEditingCampaign(campaign);
        setTitle(campaign.title || "");
        setTriggerText(campaign.triggerText || "");
        setDescription(campaign.description || "");
        setThankYouMessage(campaign.thankYouMessage || "");
        setIsActive(campaign.isActive !== undefined ? campaign.isActive : true);

        if (campaign.questions && campaign.questions.length > 0) {
            setQuestions(
                campaign.questions.map((q, idx) => ({
                    id: q.id || String(idx + 1),
                    questionText: q.questionText || "",
                    replyType: q.replyType || "text",
                    options: q.options && q.options.length > 0 ? [...q.options] : [""],
                }))
            );
        } else {
            setQuestions([{ id: "1", questionText: "", replyType: "text", options: [""] }]);
        }
        setShowModal(true);
    };

    const handleAddQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { id: String(Date.now()), questionText: "", replyType: "text", options: [""] },
        ]);
    };

    const handleRemoveQuestion = (index) => {
        if (questions.length <= 1) return;
        setQuestions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index, field, value) => {
        setQuestions((prev) =>
            prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
        );
    };

    const handleAddOption = (qIndex) => {
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? { ...q, options: [...(q.options || []), ""] }
                    : q
            )
        );
    };

    const handleRemoveOption = (qIndex, optIndex) => {
        setQuestions((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;
                const newOpts = (q.options || []).filter((_, oIdx) => oIdx !== optIndex);
                return { ...q, options: newOpts.length > 0 ? newOpts : [""] };
            })
        );
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        setQuestions((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;
                const newOpts = [...(q.options || [])];
                newOpts[optIndex] = value;
                return { ...q, options: newOpts };
            })
        );
    };

    const handleSubmitCampaign = async (e) => {
        e.preventDefault();
        if (!title.trim() || !triggerText.trim()) {
            alert("Please enter Campaign Title and Trigger Text");
            return;
        }

        const payload = {
            title: title.trim(),
            triggerText: triggerText.trim(),
            description,
            thankYouMessage,
            isActive,
            questions: questions.map((q) => ({
                id: q.id,
                questionText: q.questionText,
                replyType: q.replyType,
                options: q.replyType === "options" ? q.options.filter(Boolean) : [],
            })),
        };

        try {
            const url = editingCampaign
                ? `${API_BASE}/client/campaigns/${editingCampaign._id}`
                : `${API_BASE}/client/campaigns`;
            const method = editingCampaign ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.success) {
                setShowModal(false);
                resetForm();
                fetchData();
            } else {
                alert(data.message || "Failed to save campaign");
            }
        } catch (err) {
            console.error("Error saving campaign:", err);
            alert("Error saving campaign");
        }
    };

    const handleDeleteCampaign = async (id) => {
        if (!window.confirm("Are you sure you want to delete this campaign? All user submissions for this campaign will also be deleted.")) return;
        try {
            const res = await fetch(`${API_BASE}/client/campaigns/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setCampaigns((prev) => prev.filter((c) => c._id !== id));
                setResponses((prev) => prev.filter((r) => r.campaignId !== id));
            } else {
                alert(data.message || "Failed to delete campaign");
            }
        } catch (err) {
            console.error("Error deleting campaign:", err);
        }
    };

    const handleDeleteResponse = async (id) => {
        if (!window.confirm("Delete this submission detail?")) return;
        try {
            const res = await fetch(`${API_BASE}/client/campaign-responses/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setResponses((prev) => prev.filter((r) => r._id !== id));
            } else {
                alert(data.message || "Failed to delete response");
            }
        } catch (err) {
            console.error("Error deleting response:", err);
        }
    };

    const filteredResponses = filterCampaignId
        ? responses.filter((r) => r.campaignId === filterCampaignId)
        : responses;

    if (loading) {
        return <div style={{ color: "white", padding: "2rem" }}>Loading campaigns & details...</div>;
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">Interactive Campaigns</h2>
                    <p style={{ color: "#94a3b8", marginTop: "0.25rem", fontSize: "0.95rem" }}>
                        Create set of questions and capture user choices directly in the chat widget.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button
                        className="btn-primary"
                        onClick={handleOpenCreateModal}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #a855f7)",
                            color: "white",
                            border: "none",
                            padding: "0.6rem 1.2rem",
                            borderRadius: "8px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        + Create Campaign
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.75rem" }}>
                <button
                    onClick={() => setActiveTab("campaigns")}
                    style={{
                        background: activeTab === "campaigns" ? "rgba(99, 102, 241, 0.2)" : "transparent",
                        color: activeTab === "campaigns" ? "#a5b4fc" : "#94a3b8",
                        border: activeTab === "campaigns" ? "1px solid #6366f1" : "1px solid transparent",
                        padding: "0.5rem 1.25rem",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    All Campaigns ({campaigns.length})
                </button>
                <Link
                    to="/client/submissions"
                    style={{
                        textDecoration: "none",
                        background: "transparent",
                        color: "#94a3b8",
                        border: "1px solid transparent",
                        padding: "0.5rem 1.25rem",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                    }}
                >
                    View User Submissions Page →
                </Link>
            </div>

            {/* TAB 1: CAMPAIGNS LIST */}
            {activeTab === "campaigns" && (
                <>
                    {campaigns.length === 0 ? (
                        <div className="glass-card">
                            <h4 style={{ margin: 0, color: "#cbd5e1" }}>No campaigns created yet</h4>
                            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                                Click "+ Create Campaign" to set up your first Q&A trigger workflow like "I want to work".
                            </p>
                        </div>
                    ) : (
                        <div className="glass-table-container">
                            <table className="glass-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Trigger Keyword</th>
                                        <th>Questions</th>
                                        <th>Status</th>
                                        <th>Created Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map((c) => (
                                        <tr key={c._id}>
                                            <td style={{ fontWeight: 600, color: "#f1f5f9" }}>{c.title}</td>
                                            <td>
                                                <span className="badge badge-info" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.4)" }}>
                                                    "{c.triggerText}"
                                                </span>
                                            </td>
                                            <td style={{ color: "#cbd5e1" }}>{c.questions ? c.questions.length : 0} Question(s)</td>
                                            <td>
                                                <span
                                                    className={`badge ${c.isActive ? "badge-success" : "badge-warning"}`}
                                                    style={{
                                                        backgroundColor: c.isActive ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.2)",
                                                        color: c.isActive ? "#4ade80" : "#fde047",
                                                        padding: "0.25rem 0.5rem",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    {c.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td style={{ color: "#94a3b8" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <button
                                                        onClick={() => handleOpenEditModal(c)}
                                                        style={{ background: "#3b82f6", color: "white", border: "none", padding: "0.3rem 0.6rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCampaign(c._id)}
                                                        style={{ background: "#ef4444", color: "white", border: "none", padding: "0.3rem 0.6rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}
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
                </>
            )}

            {/* TAB 2: SUBMISSIONS LIST */}
            {activeTab === "submissions" && (
                <>
                    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                        <label style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>Filter by Campaign:</label>
                        <select
                            className="form-select"
                            style={{ width: "auto", minWidth: "220px" }}
                            value={filterCampaignId}
                            onChange={(e) => setFilterCampaignId(e.target.value)}
                        >
                            <option value="">All Campaigns</option>
                            {campaigns.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredResponses.length === 0 ? (
                        <div className="glass-card">No campaign details filled by users yet.</div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {filteredResponses.map((resp) => {
                                const isExpanded = expandedResponseId === resp._id;
                                return (
                                    <div key={resp._id} className="glass-card" style={{ padding: "1.25rem", marginBottom: 0 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#f8fafc" }}>
                                                    {resp.campaignTitle}
                                                </span>
                                                <span style={{ marginLeft: "0.75rem", fontSize: "0.85rem", color: "#94a3b8" }}>
                                                    Session: {resp.sessionId.slice(0, 8)}... | {new Date(resp.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                                <button
                                                    onClick={() => setExpandedResponseId(isExpanded ? null : resp._id)}
                                                    style={{ background: "#4f46e5", color: "white", border: "none", padding: "0.35rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
                                                >
                                                    {isExpanded ? "Hide Details" : "View Answers"}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteResponse(resp._id)}
                                                    style={{ background: "#ef4444", color: "white", border: "none", padding: "0.35rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                                <h5 style={{ margin: "0 0 0.75rem 0", color: "#a5b4fc" }}>Filled Responses:</h5>
                                                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                                    {resp.answers && resp.answers.length > 0 ? (
                                                        resp.answers.map((ans, i) => (
                                                            <div key={i} style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                                <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 500 }}>
                                                                    Q{i + 1}: {ans.questionText}
                                                                </div>
                                                                <div style={{ fontSize: "1rem", color: "#38bdf8", fontWeight: 600, marginTop: "0.2rem" }}>
                                                                    Answer:{" "}
                                                                    {typeof ans.answer === "string" && (ans.answer.startsWith("http://") || ans.answer.startsWith("https://")) ? (
                                                                        <a
                                                                            href={ans.answer}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            style={{
                                                                                color: "#60a5fa",
                                                                                textDecoration: "underline",
                                                                                display: "inline-flex",
                                                                                alignItems: "center",
                                                                                gap: "0.4rem",
                                                                                background: "rgba(59, 130, 246, 0.15)",
                                                                                padding: "0.25rem 0.6rem",
                                                                                borderRadius: "6px",
                                                                                border: "1px solid rgba(96, 165, 250, 0.3)",
                                                                                fontSize: "0.9rem"
                                                                            }}
                                                                        >
                                                                            📄 View Uploaded Document / File
                                                                        </a>
                                                                    ) : (
                                                                        ans.answer
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{ color: "#94a3b8" }}>No answers recorded.</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {/* CREATE / EDIT MODAL */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.75)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "1rem",
                    }}
                >
                    <div
                        className="glass-card"
                        style={{
                            maxWidth: "720px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            background: "#0f172a",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "16px",
                            padding: "2rem",
                        }}
                    >
                        <h3 className="glass-card-title">
                            {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
                        </h3>

                        <form onSubmit={handleSubmitCampaign}>
                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Campaign Title *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Job Application"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Trigger Text / Keyword *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. I want to work"
                                        value={triggerText}
                                        onChange={(e) => setTriggerText(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description (Optional)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Brief description of this workflow"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Thank You Message (Shown at end of questions)</label>
                                <textarea
                                    className="form-textarea"
                                    style={{ minHeight: "70px" }}
                                    value={thankYouMessage}
                                    onChange={(e) => setThankYouMessage(e.target.value)}
                                    placeholder="e.g. Thank you for filling out the details! Our team will contact you soon."
                                />
                            </div>

                            {/* QUESTIONS BUILDER */}
                            <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                    <h4 style={{ margin: 0, color: "#f1f5f9" }}>Questions Sequence</h4>
                                    <button
                                        type="button"
                                        onClick={handleAddQuestion}
                                        style={{ background: "#4f46e5", color: "white", border: "none", padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
                                    >
                                        + Add Question
                                    </button>
                                </div>

                                {questions.map((q, qIdx) => (
                                    <div key={q.id || qIdx} style={{ background: "rgba(30, 41, 59, 0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1rem", marginBottom: "1rem" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                                            <span style={{ fontWeight: 600, color: "#a5b4fc" }}>Question #{qIdx + 1}</span>
                                            {questions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveQuestion(qIdx)}
                                                    style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer", fontSize: "0.85rem" }}
                                                >
                                                    Remove Question
                                                </button>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Question Text</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. What position are you applying for?"
                                                value={q.questionText}
                                                onChange={(e) => handleQuestionChange(qIdx, "questionText", e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Type of Reply Required</label>
                                            <select
                                                className="form-select"
                                                value={q.replyType}
                                                onChange={(e) => handleQuestionChange(qIdx, "replyType", e.target.value)}
                                            >
                                                <option value="text">Free Text Input (User types in chatbox)</option>
                                                <option value="options">Select from Options (Interactive buttons)</option>
                                                <option value="file">File Upload (User uploads document / resume / image)</option>
                                            </select>
                                        </div>

                                        {q.replyType === "options" && (
                                            <div style={{ marginTop: "0.75rem", paddingLeft: "1rem", borderLeft: "2px solid #6366f1" }}>
                                                <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                                                    Option Choices:
                                                </label>
                                                {q.options.map((opt, optIdx) => (
                                                    <div key={optIdx} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                                        <input
                                                            type="text"
                                                            className="form-input"
                                                            placeholder={`Option ${optIdx + 1}`}
                                                            value={opt}
                                                            onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                                                        />
                                                        {q.options.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveOption(qIdx, optIdx)}
                                                                style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "6px", padding: "0 0.6rem", cursor: "pointer" }}
                                                            >
                                                                ✕
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddOption(qIdx)}
                                                    style={{ background: "rgba(99, 102, 241, 0.2)", color: "#a5b4fc", border: "1px dashed #6366f1", padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", marginTop: "0.25rem" }}
                                                >
                                                    + Add Option Choice
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={handleAddQuestion}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        background: "rgba(99, 102, 241, 0.15)",
                                        color: "#a5b4fc",
                                        border: "1px dashed #6366f1",
                                        borderRadius: "10px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.5rem",
                                        marginTop: "0.5rem"
                                    }}
                                >
                                    + Add Next Question
                                </button>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ background: "transparent", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", borderRadius: "8px", cursor: "pointer" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", color: "white", border: "none", padding: "0.6rem 1.4rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                                >
                                    {editingCampaign ? "Save Changes" : "Create Campaign"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientCampaigns;
