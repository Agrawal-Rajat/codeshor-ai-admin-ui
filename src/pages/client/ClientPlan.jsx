import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:5500/api";

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

  if (loading) return <div>Loading plan...</div>;

  return (
    <div>
      <h2>Subscription Plan</h2>

      <div style={{ marginBottom: "20px" }}>
        <strong>Current Plan:</strong> {currentPlan}
      </div>

      {usage && (
        <div style={{ marginBottom: "20px" }}>
          <div>Monthly Limit: {usage.monthlyChatLimit}</div>
          <div>Used: {usage.monthlyChatsUsed}</div>
          <div>Remaining: {usage.remainingChats}</div>
        </div>
      )}

      <h3>Available Plans</h3>

      {plans.map((plan) => (
        <div
          key={plan.name}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "6px",
            background: plan.name === currentPlan ? "#e0f2fe" : "white",
          }}
        >
          <div>
            <strong>{plan.name}</strong>
          </div>
          <div>Monthly Chat Limit: {plan.limit}</div>

          {plan.name !== currentPlan && (
            <button
              onClick={() => upgradePlan(plan.name)}
              style={{ marginTop: "10px" }}
            >
              Upgrade
            </button>
          )}

          {plan.name === currentPlan && (
            <div style={{ marginTop: "10px" }}>Current Plan</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientPlan;
