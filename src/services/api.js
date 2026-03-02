const API_BASE = "http://localhost:5500/api";

export const createClient = async (payload) => {
    const res = await fetch(`${API_BASE}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    return res.json();
};
