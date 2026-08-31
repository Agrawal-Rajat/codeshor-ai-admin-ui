import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import API_BASE from "../../config";

const DEFAULT_WIDGET_THEME = {
  widgetAssistantTitle: "Codeshor AI",
  widgetLauncherIcon: "https://res.cloudinary.com/dgdqeidxb/image/upload/v1786740514/chatbot_logo_zzebkr.png",
  widgetChatBackgroundImage: "",
  widgetPrimaryColor: "#4f46e5",
  widgetSecondaryColor: "#6366f1",
  widgetHeaderBackgroundColor: "#111827",
  widgetBotBubbleColor: "#f3f4f6",
  widgetBotTextColor: "#111827",
  widgetHookMessageEnabled: true,
  widgetHookMessage: "Got any questions? I'm happy to help.",
  widgetHookMessageAvatar: "",
};

const ClientWidgetSettings = () => {
  const { token } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [showPreviewHook, setShowPreviewHook] = useState(true);

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
          const isLegacyLogo = (url) => typeof url === "string" && (url.includes("image_copy_r3mw8m") || url.includes("bbb_metnxp"));
          const rawLauncher = config.launcherIcon && !isLegacyLogo(config.launcherIcon) ? config.launcherIcon : DEFAULT_WIDGET_THEME.widgetLauncherIcon;
          const rawHookAvatar = config.hookMessageAvatar && !isLegacyLogo(config.hookMessageAvatar) ? config.hookMessageAvatar : "";

          setForm({
            widgetAssistantTitle: config.assistantTitle || DEFAULT_WIDGET_THEME.widgetAssistantTitle,
            widgetLauncherIcon: rawLauncher,
            widgetChatBackgroundImage: config.chatBackgroundImage || DEFAULT_WIDGET_THEME.widgetChatBackgroundImage,
            widgetPrimaryColor: config.primaryColor || DEFAULT_WIDGET_THEME.widgetPrimaryColor,
            widgetSecondaryColor: config.secondaryColor || DEFAULT_WIDGET_THEME.widgetSecondaryColor,
            widgetHeaderBackgroundColor: config.headerBackgroundColor || DEFAULT_WIDGET_THEME.widgetHeaderBackgroundColor,
            widgetBotBubbleColor: config.botBubbleColor || DEFAULT_WIDGET_THEME.widgetBotBubbleColor,
            widgetBotTextColor: config.botTextColor || DEFAULT_WIDGET_THEME.widgetBotTextColor,
            widgetHookMessageEnabled: config.hookMessageEnabled !== undefined ? config.hookMessageEnabled : DEFAULT_WIDGET_THEME.widgetHookMessageEnabled,
            widgetHookMessage: config.hookMessage || DEFAULT_WIDGET_THEME.widgetHookMessage,
            widgetHookMessageAvatar: rawHookAvatar,
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
        launcherIcon: form.widgetLauncherIcon,
        chatBackgroundImage: form.widgetChatBackgroundImage,
        primaryColor: form.widgetPrimaryColor,
        secondaryColor: form.widgetSecondaryColor,
        headerBackgroundColor: form.widgetHeaderBackgroundColor,
        botBubbleColor: form.widgetBotBubbleColor,
        botTextColor: form.widgetBotTextColor,
        hookMessageEnabled: form.widgetHookMessageEnabled,
        hookMessage: form.widgetHookMessage,
        hookMessageAvatar: form.widgetHookMessageAvatar,
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
              <label className="form-label">Launcher Icon URL</label>
              <input className="form-input" placeholder="https://example.com/icon.png" value={form.widgetLauncherIcon} onChange={(e) => update("widgetLauncherIcon", e.target.value)} />
            </div>

            {/* Hook Message Greeting Settings */}
            <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <label className="form-label" style={{ margin: 0, fontWeight: 600 }}>Hook Greeting Pop-up Message</label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", color: "#e5e7eb" }}>
                  <input
                    type="checkbox"
                    checked={form.widgetHookMessageEnabled}
                    onChange={(e) => update("widgetHookMessageEnabled", e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "#4f46e5" }}
                  />
                  Enable Pop-up
                </label>
              </div>

              {form.widgetHookMessageEnabled && (
                <>
                  <div className="form-group" style={{ marginBottom: "12px" }}>
                    <label className="form-label">Pop-up Greeting Text</label>
                    <input
                      className="form-input"
                      placeholder="Got any questions? I'm happy to help."
                      value={form.widgetHookMessage}
                      onChange={(e) => update("widgetHookMessage", e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Custom Avatar Image URL (Optional)</label>
                    <input
                      className="form-input"
                      placeholder="Leave empty to use Launcher Icon"
                      value={form.widgetHookMessageAvatar}
                      onChange={(e) => update("widgetHookMessageAvatar", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="form-group" style={{ marginTop: "1.5rem" }}>
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

              {/* Hook Message Pop-up Preview */}
              {form.widgetHookMessageEnabled && showPreviewHook && (
                <div 
                  style={{
                    position: "relative",
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "14px",
                    padding: "18px 14px 11px 14px",
                    maxWidth: previewMode === "mobile" ? "210px" : "220px",
                    margin: "0 auto 12px auto",
                    boxShadow: "0 10px 25px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => alert("Clicking this hook message on your website will open the chatbot modal!")}
                >
                  <button 
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "6px",
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      fontSize: "13px",
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPreviewHook(false);
                    }}
                    title="Close pop-up"
                  >
                    ✕
                  </button>

                  <div style={{
                    position: "absolute",
                    top: "-18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "2.5px solid #ffffff",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    background: "#f8fafc"
                  }}>
                    <img 
                      src={form.widgetHookMessageAvatar || form.widgetLauncherIcon || DEFAULT_WIDGET_THEME.widgetLauncherIcon} 
                      alt="Avatar" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </div>

                  <p style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 550,
                    color: "#0f172a",
                    lineHeight: 1.38,
                    letterSpacing: "-0.01em",
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", "Segoe UI", Roboto, sans-serif'
                  }}>
                    {form.widgetHookMessage || "Got any questions? I'm happy to help."}
                  </p>
                </div>
              )}

              {!showPreviewHook && form.widgetHookMessageEnabled && (
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <button 
                    onClick={() => setShowPreviewHook(true)}
                    style={{ background: "none", border: "none", color: "#6366f1", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Reset Pop-up Preview
                  </button>
                </div>
              )}

              <div style={previewLauncherWrapStyle}>
                <button style={{
                  ...previewLauncherStyle,
                  background: `linear-gradient(135deg, ${form.widgetPrimaryColor}, ${form.widgetSecondaryColor})`,
                  padding: "0",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  <img 
                    src={form.widgetLauncherIcon || DEFAULT_WIDGET_THEME.widgetLauncherIcon} 
                    alt="Chat" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
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
