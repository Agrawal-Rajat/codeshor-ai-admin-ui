import { useState } from "react";
import InputField from "../components/InputField";
import { createClient } from "../services/api";

const CreateClient = () => {
  const [form, setForm] = useState({
    name: "",
    domain: "",
    services: "",
    pricing: "",
    faqs: "",
    testimonials: "",
    phone: "",
    email: "",
    address: "",
    businessHours: "",
  });

  const update = (key, value) => setForm({ ...form, [key]: value });

  const submit = async () => {
    const payload = {
      name: form.name,
      domain: form.domain,
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

    const res = await createClient(payload);
    alert(res.message || "Submitted");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h2>Create Client</h2>

      <InputField
        label="Business Name"
        value={form.name}
        onChange={(v) => update("name", v)}
      />
      <InputField
        label="Domain"
        value={form.domain}
        onChange={(v) => update("domain", v)}
      />

      <InputField
        label="Services"
        textarea
        value={form.services}
        onChange={(v) => update("services", v)}
      />
      <InputField
        label="Pricing"
        textarea
        value={form.pricing}
        onChange={(v) => update("pricing", v)}
      />
      <InputField
        label="FAQs"
        textarea
        value={form.faqs}
        onChange={(v) => update("faqs", v)}
      />
      <InputField
        label="Testimonials"
        textarea
        value={form.testimonials}
        onChange={(v) => update("testimonials", v)}
      />

      <InputField
        label="Phone"
        value={form.phone}
        onChange={(v) => update("phone", v)}
      />
      <InputField
        label="Email"
        value={form.email}
        onChange={(v) => update("email", v)}
      />
      <InputField
        label="Address"
        value={form.address}
        onChange={(v) => update("address", v)}
      />

      <InputField
        label="Business Hours"
        value={form.businessHours}
        onChange={(v) => update("businessHours", v)}
      />

      <button onClick={submit}>Create Client</button>
    </div>
  );
};

export default CreateClient;
