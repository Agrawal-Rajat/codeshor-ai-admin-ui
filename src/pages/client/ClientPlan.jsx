import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const plans = [
  { name: "STARTER", textLimit: 1000, voiceLimit: 100 },
  { name: "PRO", textLimit: 3000, voiceLimit: 400 },
  { name: "AGENCY", textLimit: 10000, voiceLimit: 1500 },
];

const ClientPlan = () => {
  const { token } = useAuth();
  const [currentPlan, setCurrentPlan] = useState("");
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpData, setTopUpData] = useState({ textTopUp: 0, voiceTopUp: 0 });
  const [topUpLoading, setTopUpLoading] = useState(false);

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

    const confirm = window.confirm(`Upgrade to ${plan}? You will be redirected to Razorpay securely.`);

    if (!confirm) return;

    try {
      // Mock payment gateway redirection here
      console.log("Mocking Razorpay Gateway...");
      
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
        alert("Payment successful! Plan upgraded.");
        fetchDashboard();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Upgrade failed");
    }
  };

  const handleRequestTopUp = async (e) => {
    e.preventDefault();
    
    const confirm = window.confirm("You will be redirected to Razorpay to complete this top-up transaction. Proceed?");
    if (!confirm) return;
    
    setTopUpLoading(true);

    try {
      // Mock payment gateway redirection here
      console.log("Mocking Razorpay Gateway...");

      const res = await fetch(`${API_BASE}/client/request-topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          textTopUp: parseInt(topUpData.textTopUp) || 0,
          voiceTopUp: parseInt(topUpData.voiceTopUp) || 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Payment successful! Top-up applied to your account.");
        setIsTopUpOpen(false);
        fetchDashboard();
      } else {
        alert(data.message || "Failed to process top-up.");
      }
    } catch (err) {
      alert("An error occurred during top-up.");
    } finally {
      setTopUpLoading(false);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className={`badge ${currentPlan === 'AGENCY' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
              {currentPlan}
            </span>
            <button 
              className="btn-primary" 
              style={{ 
                padding: '0.4rem 1rem', 
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(to right, #4f46e5, #818cf8)'
              }}
              onClick={() => setIsTopUpOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Request Top-Up
            </button>
          </div>
        </div>
        
        {usage && (
          <div style={{ display: "flex", gap: "2rem", textAlign: "right" }}>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Text Limit</div>
              <div style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: 600 }}>{usage.monthlyChatLimit}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Text Used</div>
              <div style={{ color: "#fca5a5", fontSize: "1.25rem", fontWeight: 600 }}>{usage.monthlyChatsUsed}</div>
            </div>
            <div style={{ borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "1rem" }}>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Text Remaining</div>
              <div style={{ color: "#86efac", fontSize: "1.25rem", fontWeight: 600 }}>{usage.remainingChats}</div>
            </div>

            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Voice Limit</div>
              <div style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: 600 }}>{usage.monthlyVoiceLimit}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Voice Used</div>
              <div style={{ color: "#fca5a5", fontSize: "1.25rem", fontWeight: 600 }}>{usage.monthlyVoiceUsed}</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Voice Remaining</div>
              <div style={{ color: "#86efac", fontSize: "1.25rem", fontWeight: 600 }}>{usage.remainingVoice}</div>
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
            <div style={{ color: "#94a3b8", marginBottom: "0.5rem" }}>
              Up to {plan.textLimit} chats / month
            </div>
            <div style={{ color: "#94a3b8", marginBottom: "2rem" }}>
              Up to {plan.voiceLimit} voice limits / month
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

      {/* Top Up Request Modal */}
      {isTopUpOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-card" style={{ maxWidth: '400px' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Request Top-Up</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Select the amount of credits to purchase. You will be redirected to Razorpay securely.
            </p>
            <form onSubmit={handleRequestTopUp}>
              <div className="form-group">
                <label>Text Messages Limit (+₹500 per 1000)</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  step="1000"
                  value={topUpData.textTopUp}
                  onChange={(e) => setTopUpData({ ...topUpData, textTopUp: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Voice Messages Limit (+₹800 per 1000)</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  step="100"
                  value={topUpData.voiceTopUp}
                  onChange={(e) => setTopUpData({ ...topUpData, voiceTopUp: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary" disabled={topUpLoading || (topUpData.textTopUp == 0 && topUpData.voiceTopUp == 0)}>
                  {topUpLoading ? "Processing..." : "Proceed to Payment"}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setIsTopUpOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPlan;
