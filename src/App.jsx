import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientLeads from "./pages/client/ClientLeads";
import ClientConversations from "./pages/client/ClientConversations";
import ConversationDetail from "./pages/client/ConversationDetail";
import ClientPlan from "./pages/client/ClientPlan";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminClients from "./pages/admin/AdminClients";
import AdminUsage from "./pages/admin/AdminUsage";
import AdminClientDetail from "./pages/admin/AdminClientDetail";
import AdminCreateClient from "./pages/admin/AdminCreateClient";
import AdminEditClient from "./pages/admin/AdminEditClient";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="clients/:id/edit" element={<AdminEditClient />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="clients/create" element={<AdminCreateClient />} />
            <Route path="clients/:id" element={<AdminClientDetail />} />
            <Route path="usage" element={<AdminUsage />} />
          </Route>

          <Route
            path="/client"
            element={
              <ProtectedRoute role="CLIENT">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="leads" element={<ClientLeads />} />
            <Route path="plan" element={<ClientPlan />} />
            <Route path="conversations" element={<ClientConversations />} />
            <Route
              path="conversations/:sessionId"
              element={<ConversationDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
