import { Routes, Route } from 'react-router-dom'

import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import ClienteDashboard from '../pages/cliente/ClienteDashboard'
import AgenteDashboard from '../pages/agente/AgenteDashboard'
import AgentePedidos from '../pages/agente/AgentePedidos'
import AgentePedidoDetalhe from '../pages/agente/AgentePedidoDetalhe'
import Automoveis from '../pages/cliente/Automoveis'
import MeusPedidos from '../pages/cliente/MeusPedidos'
import DetalhePedido from '../pages/cliente/DetalhePedido'
import ProtectedRoute from './ProtectedRoute'
import PedidoAluguelPage from '../pages/PedidoAluguelPage/PedidoAluguelPage'
import CadastroCliente from '../pages/cliente/CadastroCliente'
import ContatoEmail from '../pages/contato/ContatoEmail'

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />          {/* era Login, agora é Home */}
      <Route path="/login" element={<Login />} />    {/* Login vira rota própria */}
      <Route path="/cadastro" element={<CadastroCliente />} />    {/* Login vira rota própria */}
      <Route path="/contatoEmail" element={<ContatoEmail />} />    {/* Login vira rota própria */}
      


      {/* Rotas do Cliente */}
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

      {/* Rotas do Agente */}
      <Route path="/agente/dashboard" element={
        <ProtectedRoute tipoPermitido="AGENTE"><AgenteDashboard /></ProtectedRoute>
      } />
      <Route path="/agente/pedidos" element={
        <ProtectedRoute tipoPermitido="AGENTE"><AgentePedidos /></ProtectedRoute>
      } />
      <Route path="/agente/pedidos/:id" element={
        <ProtectedRoute tipoPermitido="AGENTE"><AgentePedidoDetalhe /></ProtectedRoute>
      } />
    </Routes>
  )
}
