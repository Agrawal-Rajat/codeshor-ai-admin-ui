import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const ONBOARDING_TEMPLATE = `Company Overview:
- What does the business do?
- What is unique about this business?

Ideal Customer Profile:
- Who should this assistant help?
- Preferred locations/industries/customer type

Primary Services (Detailed):
- Service name + short description
- Service deliverables + expected timeline

Pricing & Plans:
- Plan names, pricing, what is included
- Any discount rules or package conditions

Lead Qualification Rules:
- What makes a lead high priority?
- What details should always be captured?

Escalation Rules:
- When should assistant ask user to call/email team?
- Any urgent-case routing instructions

Business Policies:
- Refund/cancellation policy
- Support or response timelines

Communication Style:
- Brand voice/tone guidelines
- Any words/claims assistant should avoid`;

const DEFAULT_WIDGET_THEME = {
  widgetAssistantTitle: "Codeshor AI",
  widgetLauncherText: "💬 Chat with us",
  widgetChatBackgroundImage: "",
  widgetPrimaryColor: "#4f46e5",
  widgetSecondaryColor: "#6366f1",
  widgetHeaderBackgroundColor: "#111827",
  widgetBotBubbleColor: "#f3f4f6",
  widgetBotTextColor: "#111827",
};

const AdminCreateClient = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    domain: "",
    plan: "STARTER",
    languages: "en",
    services: "",
    pricing: "",
    faqs: "",
    testimonials: "",
    additionalContext: "",
    phone: "",
    email: "",
    address: "",
    businessHours: "",
    ...DEFAULT_WIDGET_THEME,
    userEmail: "",
    userPassword: "",
  });
  const [previewMode, setPreviewMode] = useState("desktop");

  const update = (key, value) => setForm({ ...form, [key]: value });

  const insertOnboardingTemplate = () => {
    setForm((prev) => ({
      ...prev,
      additionalContext: prev.additionalContext?.trim()
        ? `${prev.additionalContext.trim()}\n\n${ONBOARDING_TEMPLATE}`
        : ONBOARDING_TEMPLATE,
    }));
  };

  const resetWidgetTheme = () => {
    setForm((prev) => ({
      ...prev,
      ...DEFAULT_WIDGET_THEME,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: form.name,
        domain: form.domain,
        plan: form.plan,
        languages: form.languages.split(","),
        services: form.services,
        pricing: form.pricing,
        faqs: form.faqs,
        testimonials: form.testimonials,
        additionalContext: form.additionalContext,
        contactInfo: {
          phone: form.phone,
          email: form.email,
          address: form.address,
        },
        widgetConfig: {
          assistantTitle: form.widgetAssistantTitle,
          launcherText: form.widgetLauncherText,
          chatBackgroundImage: form.widgetChatBackgroundImage,
          primaryColor: form.widgetPrimaryColor,
          secondaryColor: form.widgetSecondaryColor,
          headerBackgroundColor: form.widgetHeaderBackgroundColor,
          botBubbleColor: form.widgetBotBubbleColor,
          botTextColor: form.widgetBotTextColor,
        },
        businessHours: form.businessHours,
        userEmail: form.userEmail,
        userPassword: form.userPassword,
      };

      const res = await fetch(`${API_BASE}/admin/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Client created successfully");
      navigate("/admin/clients");
    } catch (err) {
      alert("Failed to create client");
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Create New Client</h2>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Core Details</h3>
        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input className="form-input" placeholder="e.g. Acme Corp" value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Domain</label>
            <input className="form-input" placeholder="acme.com" value={form.domain} onChange={(e) => update("domain", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Subscription Plan</label>
            <select className="form-select" value={form.plan} onChange={(e) => update("plan", e.target.value)}>
              <option value="STARTER">STARTER</option>
              <option value="PRO">PRO</option>
              <option value="AGENCY">AGENCY</option>
            </select>
          </div>
        </div>
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <label className="form-label">Languages (comma separated)</label>
          <input className="form-input" placeholder="en, es, fr" value={form.languages} onChange={(e) => update("languages", e.target.value)} />
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Client Login Credentials</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Login Email</label>
            <input className="form-input" type="email" placeholder="admin@acme.com" value={form.userEmail} onChange={(e) => update("userEmail", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Temporary Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.userPassword} onChange={(e) => update("userPassword", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Contact Information</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input className="form-input" placeholder="contact@acme.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Physical Address</label>
            <input className="form-input" placeholder="123 Startup Blvd, Tech City" value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Business Hours</label>
            <input className="form-input" placeholder="Mon-Fri, 9am - 5pm EST" value={form.businessHours} onChange={(e) => update("businessHours", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Business Profile (AI Knowledge Base)</h3>

        <div className="form-group">
          <label className="form-label">Products & Services</label>
          <textarea className="form-textarea" placeholder="Describe the core offerings..." value={form.services} onChange={(e) => update("services", e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Pricing Strategy</label>
          <textarea className="form-textarea" placeholder="Detail the pricing plans and costs..." value={form.pricing} onChange={(e) => update("pricing", e.target.value)} />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Frequently Asked Questions (FAQs)</label>
            <textarea className="form-textarea" placeholder="Q: What is your refund policy?&#10;A: We offer a 30-day money back guarantee." value={form.faqs} onChange={(e) => update("faqs", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Testimonials / Reviews</label>
            <textarea className="form-textarea" placeholder="Customer reviews that the AI can reference..." value={form.testimonials} onChange={(e) => update("testimonials", e.target.value)} />
          </div>
        </div>

        <div className="template-box">
          <h4>Need help structuring the knowledge base?</h4>
          <p>Use our standardized Onboarding Template to ensure the AI receives high-quality, perfectly structured context about this business.</p>
          <button className="btn-secondary" onClick={insertOnboardingTemplate}>Inject Template</button>
          <div className="template-preview">{ONBOARDING_TEMPLATE}</div>
        </div>

        <div className="form-group">
          <label className="form-label">Additional Context / Custom Rules</label>
          <textarea className="form-textarea" style={{ minHeight: "250px" }} placeholder="Paste the onboarding template or write custom instructions here..." value={form.additionalContext} onChange={(e) => update("additionalContext", e.target.value)} />
        </div>
      </div>

      <div className="glass-card">
        <h3 className="glass-card-title">Widget Customization</h3>
        <div className="form-layout-sidebar">
          {/* Left Column: Settings */}
          <div>
            <div className="form-group">
              <label className="form-label">Widget Assistant Title</label>
              <input className="form-input" placeholder="e.g. Acme Assistant" value={form.widgetAssistantTitle} onChange={(e) => update("widgetAssistantTitle", e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Launcher Text</label>
              <input className="form-input" placeholder="e.g. Chat with Sales" value={form.widgetLauncherText} onChange={(e) => update("widgetLauncherText", e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Chat Background Image URL (Optional)</label>
              <input className="form-input" placeholder="https://example.com/bg.png" value={form.widgetChatBackgroundImage} onChange={(e) => update("widgetChatBackgroundImage", e.target.value)} />
            </div>

            <div className="form-grid-2" style={{ marginTop: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Primary Color</label>
                <div className="color-picker-group">
                  <input type="color" className="color-input" value={form.widgetPrimaryColor} onChange={(e) => update("widgetPrimaryColor", e.target.value)} />
                  <span>{form.widgetPrimaryColor}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Secondary Color</label>
                <div className="color-picker-group">
                  <input type="color" className="color-input" value={form.widgetSecondaryColor} onChange={(e) => update("widgetSecondaryColor", e.target.value)} />
                  <span>{form.widgetSecondaryColor}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Header Background Color</label>
                <div className="color-picker-group">
                  <input type="color" className="color-input" value={form.widgetHeaderBackgroundColor} onChange={(e) => update("widgetHeaderBackgroundColor", e.target.value)} />
                  <span>{form.widgetHeaderBackgroundColor}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bot Bubble Color</label>
                <div className="color-picker-group">
                  <input type="color" className="color-input" value={form.widgetBotBubbleColor} onChange={(e) => update("widgetBotBubbleColor", e.target.value)} />
                  <span>{form.widgetBotBubbleColor}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bot Text Color</label>
                <div className="color-picker-group">
                  <input type="color" className="color-input" value={form.widgetBotTextColor} onChange={(e) => update("widgetBotTextColor", e.target.value)} />
                  <span>{form.widgetBotTextColor}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <button className="btn-secondary" onClick={resetWidgetTheme}>Reset Theme to Defaults</button>
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div className="widget-preview-container">
            <div className="live-widget-card">
              <div className="preview-toggle-wrap">
                <button
                  className={`preview-toggle-btn ${previewMode === "desktop" ? "active" : ""}`}
                  onClick={() => setPreviewMode("desktop")}
                >
                  Desktop
                </button>
                <button
                  className={`preview-toggle-btn ${previewMode === "mobile" ? "active" : ""}`}
                  onClick={() => setPreviewMode("mobile")}
                >
                  Mobile
                </button>
              </div>

              <div style={previewLauncherWrapStyle}>
                <button style={{
                  ...previewLauncherStyle,
                  background: `linear-gradient(135deg, ${form.widgetPrimaryColor}, ${form.widgetSecondaryColor})`
                }}>
                  {form.widgetLauncherText || DEFAULT_WIDGET_THEME.widgetLauncherText}
                </button>
              </div>

              <div style={{
                ...previewModalStyle,
                ...(previewMode === "mobile" ? previewModalMobileStyle : previewModalDesktopStyle)
              }}>
                <div style={{
                  ...previewHeaderStyle,
                  background: form.widgetHeaderBackgroundColor,
                }}>
                  {form.widgetAssistantTitle || DEFAULT_WIDGET_THEME.widgetAssistantTitle}
                </div>
                <div style={{
                  ...previewMessagesStyle,
                  backgroundImage: form.widgetChatBackgroundImage ? `url(${form.widgetChatBackgroundImage})` : "none"
                }}>
                  <div style={{
                    ...previewBotBubbleStyle,
                    background: form.widgetBotBubbleColor,
                    color: form.widgetBotTextColor,
                  }}>
                    Hello! This is how bot text will look.
                  </div>
                  <div style={{
                    ...previewUserBubbleStyle,
                    background: `linear-gradient(135deg, ${form.widgetPrimaryColor}, ${form.widgetSecondaryColor})`
                  }}>
                    Nice! Theme looks good.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions-footer">
        <button className="btn-primary" onClick={handleSubmit}>
          Create Client Account
        </button>
      </div>
    </div>
  );
};

// Inline styles for the widget preview that require dynamic values
const previewLauncherWrapStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px",
  width: "100%",
};

const previewLauncherStyle = {
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "10px 16px",
  fontWeight: 600,
  cursor: "default",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const previewModalStyle = {
  width: "100%",
  borderRadius: "14px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  margin: "0 auto",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
};

const previewModalDesktopStyle = {
  maxWidth: "360px",
};

const previewModalMobileStyle = {
  maxWidth: "290px",
};

const previewHeaderStyle = {
  color: "#fff",
  padding: "12px 16px",
  fontWeight: 600,
  fontSize: "0.95rem",
};

const previewMessagesStyle = {
  padding: "16px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "#ffffff",
  minHeight: "180px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const previewBotBubbleStyle = {
  alignSelf: "flex-start",
  padding: "10px 14px",
  borderRadius: "14px",
  maxWidth: "85%",
  fontSize: "13px",
  lineHeight: 1.4,
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
};

const previewUserBubbleStyle = {
  alignSelf: "flex-end",
  padding: "10px 14px",
  borderRadius: "14px",
  maxWidth: "85%",
  fontSize: "13px",
  color: "#fff",
  lineHeight: 1.4,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

export default AdminCreateClient;
