import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:5500/api";

const AdminEditClient = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const update = (key, value) => setForm({ ...form, [key]: value });

  useEffect(() => {
    const fetchClient = async () => {
      const res = await fetch(`${API_BASE}/admin/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        const c = data.data;

        setForm({
          name: c.name || "",
          domain: c.domain || "",
          plan: c.plan || "STARTER",
          languages: (c.languages || []).join(","),
          services: c.businessProfile?.services || "",
          pricing: c.businessProfile?.pricing || "",
          faqs: c.businessProfile?.faqs || "",
          testimonials: c.businessProfile?.testimonials || "",
          phone: c.businessProfile?.contactInfo?.phone || "",
          email: c.businessProfile?.contactInfo?.email || "",
          address: c.businessProfile?.contactInfo?.address || "",
          businessHours: c.businessProfile?.businessHours || "",
        });
      }

      setLoading(false);
    };

    fetchClient();
  }, [id, token]);

  const handleSubmit = async () => {
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
    };

    const res = await fetch(`${API_BASE}/admin/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Client updated successfully");
      navigate(`/admin/clients/${id}`);
    } else {
      alert(data.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Client not found</div>;

  return (
    <div>
      <h2>Edit Client</h2>

      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        placeholder="Business Name"
      />

      <input
        value={form.domain}
        onChange={(e) => update("domain", e.target.value)}
        placeholder="Domain"
      />

      <select
        value={form.plan}
        onChange={(e) => update("plan", e.target.value)}
      >
        <option value="STARTER">STARTER</option>
        <option value="PRO">PRO</option>
        <option value="AGENCY">AGENCY</option>
      </select>

      <textarea
        value={form.services}
        onChange={(e) => update("services", e.target.value)}
        placeholder="Services"
      />

      <textarea
        value={form.pricing}
        onChange={(e) => update("pricing", e.target.value)}
        placeholder="Pricing"
      />

      <textarea
        value={form.faqs}
        onChange={(e) => update("faqs", e.target.value)}
        placeholder="FAQs"
      />

      <textarea
        value={form.testimonials}
        onChange={(e) => update("testimonials", e.target.value)}
        placeholder="Testimonials"
      />

      <input
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        placeholder="Phone"
      />

      <input
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder="Business Email"
      />

      <input
        value={form.address}
        onChange={(e) => update("address", e.target.value)}
        placeholder="Address"
      />

      <input
        value={form.businessHours}
        onChange={(e) => update("businessHours", e.target.value)}
        placeholder="Business Hours"
      />

      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default AdminEditClient;
