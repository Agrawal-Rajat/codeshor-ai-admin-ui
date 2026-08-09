import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

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

const ClientWidgetSettings = () => {
  const { token } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState("desktop");

  const update = (key, value) => setForm({ ...form, [key]: value });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/client/widget-settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        
        if (data.success) {
          const config = data.data || {};
          setForm({
            widgetAssistantTitle: config.assistantTitle || DEFAULT_WIDGET_THEME.widgetAssistantTitle,
            widgetLauncherText: config.launcherText || DEFAULT_WIDGET_THEME.widgetLauncherText,
            widgetChatBackgroundImage: config.chatBackgroundImage || DEFAULT_WIDGET_THEME.widgetChatBackgroundImage,
            widgetPrimaryColor: config.primaryColor || DEFAULT_WIDGET_THEME.widgetPrimaryColor,
            widgetSecondaryColor: config.secondaryColor || DEFAULT_WIDGET_THEME.widgetSecondaryColor,
            widgetHeaderBackgroundColor: config.headerBackgroundColor || DEFAULT_WIDGET_THEME.widgetHeaderBackgroundColor,
            widgetBotBubbleColor: config.botBubbleColor || DEFAULT_WIDGET_THEME.widgetBotBubbleColor,
            widgetBotTextColor: config.botTextColor || DEFAULT_WIDGET_THEME.widgetBotTextColor,
            widgetDefaultQuestions: config.defaultQuestions || [],
          });
        }
      } catch (err) {
        console.error("Failed to fetch widget settings");
      }
      setLoading(false);
    };

    fetchSettings();
  }, [token]);

  const resetWidgetTheme = () => {
    setForm((prev) => ({
      ...prev,
      ...DEFAULT_WIDGET_THEME,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      widgetConfig: {
        assistantTitle: form.widgetAssistantTitle,
        launcherText: form.widgetLauncherText,
        chatBackgroundImage: form.widgetChatBackgroundImage,
        primaryColor: form.widgetPrimaryColor,
        secondaryColor: form.widgetSecondaryColor,
        headerBackgroundColor: form.widgetHeaderBackgroundColor,
        botBubbleColor: form.widgetBotBubbleColor,
        botTextColor: form.widgetBotTextColor,
        defaultQuestions: form.widgetDefaultQuestions,
      }
    };

    try {
      const res = await fetch(`${API_BASE}/client/widget-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Widget settings updated successfully!");
      } else {
        alert(data.message || "Failed to update widget settings");
      }
    } catch (err) {
      alert("Failed to update widget settings");
    }
  };

  if (loading) return <div style={{ color: "white", padding: "2rem" }}>Loading settings...</div>;
  if (!form) return <div style={{ color: "white", padding: "2rem" }}>Error loading settings</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Widget Settings</h2>
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

            <div className="form-group" style={{ marginTop: "1.5rem" }}>
              <label className="form-label">Default Questions (Max 3)</label>
              <p style={{fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem"}}>
                Add clickable preset questions users can send instantly.
              </p>
              {form.widgetDefaultQuestions?.map((q, index) => (
                  <div key={index} style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                     <input type="text" placeholder="Question" value={q.question} onChange={e => {
                        const newQ = [...form.widgetDefaultQuestions];
                        newQ[index].question = e.target.value;
                        update("widgetDefaultQuestions", newQ);
                     }} className="form-input" style={{flex: 1}} />
                     <input type="text" placeholder="Answer" value={q.answer} onChange={e => {
                        const newQ = [...form.widgetDefaultQuestions];
                        newQ[index].answer = e.target.value;
                        update("widgetDefaultQuestions", newQ);
                     }} className="form-input" style={{flex: 1}} />
                     <button type="button" onClick={() => {
                        const newQ = form.widgetDefaultQuestions.filter((_, i) => i !== index);
                        update("widgetDefaultQuestions", newQ);
                     }} className="btn-secondary" style={{padding: "0 10px"}}>Remove</button>
                  </div>
              ))}
              {(!form.widgetDefaultQuestions || form.widgetDefaultQuestions.length < 3) && (
                  <button type="button" className="btn-secondary" onClick={() => {
                     const current = form.widgetDefaultQuestions || [];
                     update("widgetDefaultQuestions", [...current, {question: '', answer: ''}]);
                  }}>+ Add Question</button>
              )}
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
          Save Changes
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

export default ClientWidgetSettings;
