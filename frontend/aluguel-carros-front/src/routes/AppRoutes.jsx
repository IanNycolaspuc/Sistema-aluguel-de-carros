import { Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import ClienteDashboard from '../pages/cliente/ClienteDashboard'
import AgenteDashboard from '../pages/agente/AgenteDashboard'
import Automoveis from '../pages/cliente/Automoveis'  

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
      <Route path="/agente/dashboard" element={<AgenteDashboard />} />
      <Route path="/cliente/automoveis" element={<Automoveis />} />
    </Routes>
  )
}