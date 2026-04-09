import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import ClienteDashboard from '../pages/ClienteDashboard/ClienteDashboard'
import AgenteDashboard from '../pages/AgenteDashboard/AgenteDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
      <Route path="/agente/dashboard" element={<AgenteDashboard />} />
    </Routes>
  )
}