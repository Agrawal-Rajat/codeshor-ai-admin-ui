import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "https://codeshor-ai-backend.onrender.com/api";

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
    phone: "",
    email: "",
    address: "",
    businessHours: "",
    userEmail: "",
    userPassword: "",
  });

  const update = (key, value) => setForm({ ...form, [key]: value });

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
        contactInfo: {
          phone: form.phone,
          email: form.email,
          address: form.address,
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
    <div>
      <h2>Create Client</h2>

      <input
        placeholder="Business Name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />

      <input
        placeholder="Domain"
        value={form.domain}
        onChange={(e) => update("domain", e.target.value)}
      />

      <select
        value={form.plan}
        onChange={(e) => update("plan", e.target.value)}
      >
        <option value="STARTER">STARTER</option>
        <option value="PRO">PRO</option>
        <option value="AGENCY">AGENCY</option>
      </select>

      <input
        placeholder="Languages (comma separated)"
        value={form.languages}
        onChange={(e) => update("languages", e.target.value)}
      />

      <textarea
        placeholder="Services"
        value={form.services}
        onChange={(e) => update("services", e.target.value)}
      />

      <textarea
        placeholder="Pricing"
        value={form.pricing}
        onChange={(e) => update("pricing", e.target.value)}
      />

      <textarea
        placeholder="FAQs"
        value={form.faqs}
        onChange={(e) => update("faqs", e.target.value)}
      />

      <textarea
        placeholder="Testimonials"
        value={form.testimonials}
        onChange={(e) => update("testimonials", e.target.value)}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
      />

      <input
        placeholder="Business Email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => update("address", e.target.value)}
      />

      <input
        placeholder="Business Hours"
        value={form.businessHours}
        onChange={(e) => update("businessHours", e.target.value)}
      />

      <h3>Client Login Credentials</h3>

      <input
        placeholder="Client Login Email"
        value={form.userEmail}
        onChange={(e) => update("userEmail", e.target.value)}
      />

      <input
        type="password"
        placeholder="Client Password"
        value={form.userPassword}
        onChange={(e) => update("userPassword", e.target.value)}
      />

      <button onClick={handleSubmit}>Create Client</button>
    </div>
  );
};

export default AdminCreateClient;
