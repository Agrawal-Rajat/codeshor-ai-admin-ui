import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const ClientSubmissions = () => {
    const { token } = useAuth();
    const [responses, setResponses] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCampaignId, setSelectedCampaignId] = useState("");
    const [expandedResponseId, setExpandedResponseId] = useState(null);

    const fetchData = async () => {
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

            if (cData.success) setCampaigns(cData.data || []);
            if (rData.success) setResponses(rData.data || []);
        } catch (err) {
            console.error("Failed to load submissions", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleDeleteResponse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this submission entry?")) return;
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

    // Filter responses by campaign selection and search query
    const filteredResponses = responses.filter((r) => {
        const matchesCampaign = selectedCampaignId ? r.campaignId === selectedCampaignId : true;

        const qText = searchQuery.toLowerCase().trim();
        if (!qText) return matchesCampaign;

        const matchesTitle = r.campaignTitle?.toLowerCase().includes(qText);
        const matchesSession = r.sessionId?.toLowerCase().includes(qText);
        const matchesAnswers = r.answers?.some(
            (ans) =>
                ans.questionText?.toLowerCase().includes(qText) ||
                ans.answer?.toLowerCase().includes(qText)
        );

        return matchesCampaign && (matchesTitle || matchesSession || matchesAnswers);
    });

    // Export to CSV function
    const handleExportCSV = () => {
        if (filteredResponses.length === 0) {
            alert("No submissions available to export.");
            return;
        }

        // Determine max number of questions across filtered responses to construct columns
        let maxQ = 0;
        filteredResponses.forEach((r) => {
            if (r.answers && r.answers.length > maxQ) {
                maxQ = r.answers.length;
            }
        });

        // Header row
        const headers = ["Submission Date", "Campaign Title", "Session ID"];
        for (let i = 1; i <= maxQ; i++) {
            headers.push(`Question ${i}`, `Answer ${i}`);
        }

        // Data rows
        const rows = filteredResponses.map((r) => {
            const formattedDate = new Date(r.createdAt).toLocaleString().replace(/,/g, "");
            const row = [
                `"${formattedDate}"`,
                `"${(r.campaignTitle || "").replace(/"/g, '""')}"`,
                `"${(r.sessionId || "").replace(/"/g, '""')}"`,
            ];

            for (let i = 0; i < maxQ; i++) {
                const ans = r.answers && r.answers[i];
                if (ans) {
                    row.push(
                        `"${(ans.questionText || "").replace(/"/g, '""')}"`,
                        `"${(ans.answer || "").replace(/"/g, '""')}"`
                    );
                } else {
                    row.push('""', '""');
                }
            }
            return row.join(",");
        });

        const csvString = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `User_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading user submissions...</div>;

    return (
        <div className="admin-page-container">
            {/* Page Header */}
            <div className="admin-page-header">
                <div>
                    <h2 className="admin-page-title">User Filled Submissions</h2>
                    <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>
                        View, search, and export details captured from interactive user campaigns.
                    </p>
                </div>
                <button
                    onClick={handleExportCSV}
                    style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "white",
                        border: "none",
                        padding: "0.6rem 1.4rem",
                        borderRadius: "8px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                    }}
                >
                    📥 Export to CSV
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div
                className="glass-card"
                style={{
                    padding: "1rem 1.25rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <label style={{ color: "#cbd5e1", fontSize: "0.88rem", fontWeight: 500 }}>Campaign:</label>
                        <select
                            className="form-select"
                            style={{ width: "auto", minWidth: "200px" }}
                            value={selectedCampaignId}
                            onChange={(e) => setSelectedCampaignId(e.target.value)}
                        >
                            <option value="">All Campaigns ({campaigns.length})</option>
                            {campaigns.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: 1, minWidth: "240px" }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="🔍 Search by campaign name, session ID, or answer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                    Showing <strong style={{ color: "#a5b4fc" }}>{filteredResponses.length}</strong> of {responses.length} Submissions
                </div>
            </div>

            {/* Excel-Style Table */}
            {filteredResponses.length === 0 ? (
                <div className="glass-card" style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <h4 style={{ margin: "0 0 0.5rem 0", color: "#cbd5e1" }}>No submissions found</h4>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
                        {responses.length === 0
                            ? "When users complete interactive campaigns, their responses will appear here."
                            : "No results matched your search or campaign filter."}
                    </p>
                </div>
            ) : (
                <div className="glass-table-container" style={{ border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", overflow: "hidden" }}>
                    <table className="glass-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "rgba(30, 41, 59, 0.9)", borderBottom: "2px solid rgba(99, 102, 241, 0.3)" }}>
                                <th style={{ padding: "0.85rem 1rem", textAlign: "left" }}>#</th>
                                <th style={{ padding: "0.85rem 1rem", textAlign: "left" }}>Date & Time</th>
                                <th style={{ padding: "0.85rem 1rem", textAlign: "left" }}>Campaign</th>
                                <th style={{ padding: "0.85rem 1rem", textAlign: "left" }}>Session ID</th>
                                <th style={{ padding: "0.85rem 1rem", textAlign: "left" }}>Q&A Responses</th>
                                <th style={{ padding: "0.85rem 1rem", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResponses.map((resp, idx) => {
                                const isExpanded = expandedResponseId === resp._id;
                                return (
                                    <tr
                                        key={resp._id}
                                        style={{
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                                            background: idx % 2 === 0 ? "rgba(15, 23, 42, 0.4)" : "rgba(30, 41, 59, 0.2)",
                                        }}
                                    >
                                        <td style={{ padding: "0.85rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>{idx + 1}</td>
                                        <td style={{ padding: "0.85rem 1rem", color: "#cbd5e1", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                                            {new Date(resp.createdAt).toLocaleString()}
                                        </td>
                                        <td style={{ padding: "0.85rem 1rem" }}>
                                            <span className="badge badge-info" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#a5b4fc", border: "1px solid rgba(99, 102, 241, 0.3)", fontWeight: 600 }}>
                                                {resp.campaignTitle}
                                            </span>
                                        </td>
                                        <td style={{ padding: "0.85rem 1rem", color: "#94a3b8", fontFamily: "monospace", fontSize: "0.82rem" }}>
                                            {resp.sessionId.slice(0, 12)}...
                                        </td>
                                        <td style={{ padding: "0.85rem 1rem", maxWidth: "480px" }}>
                                            {resp.answers && resp.answers.length > 0 ? (
                                                <div>
                                                    {!isExpanded ? (
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                                            {resp.answers.slice(0, 2).map((ans, i) => (
                                                                <div key={i} style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                                                                    <strong style={{ color: "#94a3b8" }}>{ans.questionText}:</strong>{" "}
                                                                    {typeof ans.answer === "string" && (ans.answer.startsWith("http://") || ans.answer.startsWith("https://")) ? (
                                                                        <a
                                                                            href={ans.answer}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            style={{ color: "#60a5fa", textDecoration: "underline" }}
                                                                        >
                                                                            📄 View Document
                                                                        </a>
                                                                    ) : (
                                                                        ans.answer
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {resp.answers.length > 2 && (
                                                                <button
                                                                    onClick={() => setExpandedResponseId(resp._id)}
                                                                    style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", padding: 0, textAlign: "left", fontSize: "0.8rem", marginTop: "0.2rem" }}
                                                                >
                                                                    + View all {resp.answers.length} answers...
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                                            {resp.answers.map((ans, i) => (
                                                                <div key={i} style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                                                                    <div style={{ fontSize: "0.8rem", color: "#a5b4fc", fontWeight: 600 }}>
                                                                        Q{i + 1}: {ans.questionText}
                                                                    </div>
                                                                    <div style={{ fontSize: "0.88rem", color: "#38bdf8", marginTop: "0.15rem" }}>
                                                                        {typeof ans.answer === "string" && (ans.answer.startsWith("http://") || ans.answer.startsWith("https://")) ? (
                                                                            <a
                                                                                href={ans.answer}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                style={{ color: "#60a5fa", textDecoration: "underline", fontWeight: 600 }}
                                                                            >
                                                                                📄 View Uploaded Document / File
                                                                            </a>
                                                                        ) : (
                                                                            ans.answer
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => setExpandedResponseId(null)}
                                                                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0, textAlign: "left", fontSize: "0.8rem", marginTop: "0.2rem" }}
                                                            >
                                                                ▲ Collapse answers
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span style={{ color: "#64748b" }}>No answers</span>
                                            )}
                                        </td>
                                        <td style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                                            <button
                                                onClick={() => handleDeleteResponse(resp._id)}
                                                style={{
                                                    background: "rgba(239, 68, 68, 0.15)",
                                                    color: "#fca5a5",
                                                    border: "1px solid rgba(239, 68, 68, 0.3)",
                                                    padding: "0.35rem 0.75rem",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClientSubmissions;
