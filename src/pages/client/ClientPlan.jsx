import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const plans = [
  { name: "STARTER", limit: 100 },
  { name: "PRO", limit: 1000 },
  { name: "AGENCY", limit: 5000 },
];

const ClientPlan = () => {
  const { token } = useAuth();
  const [currentPlan, setCurrentPlan] = useState("");
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/client/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setCurrentPlan(data.data.plan);
        setUsage(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch plan info");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const upgradePlan = async (plan) => {
    if (plan === currentPlan) return;

    const confirm = window.confirm(`Upgrade to ${plan}?`);

    if (!confirm) return;

    try {
      const res = await fetch(`${API_BASE}/client/upgrade-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPlan: plan }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Plan upgraded successfully");
        fetchDashboard();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Upgrade failed");
    }
  };

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading plan...</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Subscription Plan</h2>
      </div>

      <div className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#f1f5f9" }}>Current Plan</h3>
          <span className={`badge ${currentPlan === 'AGENCY' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
            {currentPlan}
          </span>
        </div>
        
        {usage && (
          <div style={{ display: "flex", gap: "2rem", textAlign: "right" }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Monthly Limit</div>
              <div style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: 600 }}>{usage.monthlyChatLimit}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Chats Used</div>
              <div style={{ color: "#fca5a5", fontSize: "1.25rem", fontWeight: 600 }}>{usage.monthlyChatsUsed}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Remaining</div>
              <div style={{ color: "#86efac", fontSize: "1.25rem", fontWeight: 600 }}>{usage.remainingChats}</div>
            </div>
          </div>
        )}
      </div>

      <h3 style={{ color: "#e2e8f0", marginBottom: "1.5rem" }}>Available Plans</h3>
      <div className="form-grid-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="glass-card"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 0,
              border: plan.name === currentPlan ? "2px solid #818cf8" : "1px solid rgba(255, 255, 255, 0.08)",
              background: plan.name === currentPlan ? "rgba(99, 102, 241, 0.1)" : "rgba(17, 24, 39, 0.6)"
            }}
          >
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
              {plan.name}
            </div>
            <div style={{ color: "#94a3b8", marginBottom: "2rem" }}>
              Up to {plan.limit} chats / month
            </div>

            <div style={{ marginTop: "auto" }}>
              {plan.name !== currentPlan ? (
                <button
                  className="btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => upgradePlan(plan.name)}
                >
                  Upgrade to {plan.name}
                </button>
              ) : (
                <div style={{
                  background: "rgba(129, 140, 248, 0.2)",
                  color: "#a5b4fc",
                  textAlign: "center",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "8px",
                  fontWeight: 600
                }}>
                  Current Plan
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPlan;
