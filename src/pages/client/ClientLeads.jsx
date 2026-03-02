import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "https://codeshor-ai-backend.onrender.com/api";

const ClientLeads = () => {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${API_BASE}/client/leads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setLeads(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch leads");
      }

      setLoading(false);
    };

    fetchLeads();
  }, [token]);

  if (loading) return <div>Loading leads...</div>;

  return (
    <div>
      <h2>Leads</h2>

      {leads.length === 0 ? (
        <div>No leads yet</div>
      ) : (
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Email</th>
              <th align="left">Source</th>
              <th align="left">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name || "-"}</td>
                <td>{lead.email || "-"}</td>
                <td>{lead.source}</td>
                <td>{new Date(lead.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientLeads;
