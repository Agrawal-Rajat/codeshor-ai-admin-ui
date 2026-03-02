const API_BASE = "https://codeshor-ai-backend.onrender.com/api";

export const createClient = async (payload) => {
    const res = await fetch(`${API_BASE}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    return res.json();
};
