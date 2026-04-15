import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import AgenteDashboard from './pages/agente/AgenteDashboard'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    
      <Routes>

        
        <Route path="/" element={<Login />} />

        
        <Route
          path="/cliente/dashboard"
          element={
            <ProtectedRoute tipoPermitido="CLIENTE">
              <ClienteDashboard />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/agente/dashboard"
          element={
            <ProtectedRoute tipoPermitido="AGENTE">
              <AgenteDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    
  )
}