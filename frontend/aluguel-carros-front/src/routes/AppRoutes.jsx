import { Routes, Route } from 'react-router-dom'

import Login from '../pages/login/Login'
import ClienteDashboard from '../pages/cliente/ClienteDashboard'
import AgenteDashboard from '../pages/agente/AgenteDashboard'
import Automoveis from '../pages/cliente/Automoveis'
import MeusPedidos from '../pages/cliente/MeusPedidos'
import DetalhePedido from '../pages/cliente/DetalhePedido'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
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
        path="/cliente/automoveis"
        element={
          <ProtectedRoute tipoPermitido="CLIENTE">
            <Automoveis />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cliente/pedidos"
        element={
          <ProtectedRoute tipoPermitido="CLIENTE">
            <MeusPedidos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cliente/pedidos/:id"
        element={
          <ProtectedRoute tipoPermitido="CLIENTE">
            <DetalhePedido />
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