import { Routes, Route } from 'react-router-dom'

import Home from '../pages/home/Home'           // <-- novo
import Login from '../pages/login/Login'
import ClienteDashboard from '../pages/cliente/ClienteDashboard'
import AgenteDashboard from '../pages/agente/AgenteDashboard'
import Automoveis from '../pages/cliente/Automoveis'
import MeusPedidos from '../pages/cliente/MeusPedidos'
import DetalhePedido from '../pages/cliente/DetalhePedido'
import ProtectedRoute from './ProtectedRoute'
import PedidoAluguelPage from '../pages/PedidoAluguelPage/PedidoAluguelPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />          {/* era Login, agora é Home */}
      <Route path="/login" element={<Login />} />    {/* Login vira rota própria */}

      <Route path="/cliente/dashboard" element={
        <ProtectedRoute tipoPermitido="CLIENTE"><ClienteDashboard /></ProtectedRoute>
      } />
      <Route path="/cliente/pedido-aluguel" element={
        <ProtectedRoute tipoPermitido="CLIENTE"><PedidoAluguelPage /></ProtectedRoute>
      } />
      <Route path="/cliente/pedidos" element={
        <ProtectedRoute tipoPermitido="CLIENTE"><MeusPedidos /></ProtectedRoute>
      } />
      <Route path="/cliente/pedidos/:id" element={
        <ProtectedRoute tipoPermitido="CLIENTE"><DetalhePedido /></ProtectedRoute>
      } />
      <Route path="/agente/dashboard" element={
        <ProtectedRoute tipoPermitido="AGENTE"><AgenteDashboard /></ProtectedRoute>
      } />
    </Routes>
  )
}