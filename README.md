# 🚗 Sistema de Aluguel de Carros

> **Disciplina:** Laboratório de Desenvolvimento de Software  
> **Curso:** Engenharia de Software — 4º Período  
> **Professor:** João Paulo Carneiro Aramuni  

---

## 📖 Sobre o Projeto

Sistema desenvolvido para informatizar o processo de matrículas de uma universidade. A secretaria gerencia disciplinas e períodos de matrícula, alunos se inscrevem nas disciplinas e professores consultam suas turmas. Após a matrícula, o sistema notifica automaticamente o setor de cobranças.

---

## 👥 Atores do Sistema

| Ator | Descrição |
|------|-----------|
| Visitante | Pessoa não cadastrada que deseja utilizar o sistema |
| Cliente | Usuário individual que realiza pedidos de aluguel |
| Agente | Empresa ou banco responsável pela avaliação financeira dos pedidos |
| Sistema | Responsável pelo controle de acessos, registros e regras de negócio |

---

## Módulo 1 — 🔐 Cadastro e Autenticação

### US01 — Cadastro de Novo Usuário

> *Como um **visitante**, eu quero **me cadastrar no sistema**, para que **eu possa acessar as funcionalidades de aluguel de automóveis**.*

**Critérios de Aceitação:**
- [ ] O sistema deve solicitar os dados obrigatórios: RG, CPF, Nome e Endereço
- [ ] O sistema deve solicitar a profissão do usuário
- [ ] O sistema deve permitir o cadastro de até 3 entidades empregadoras com seus respectivos rendimentos
- [ ] O CPF deve ser validado quanto ao formato
- [ ] O sistema deve impedir cadastros duplicados pelo CPF
- [ ] Após o cadastro, o usuário deve conseguir realizar login

---

### US02 — Login no Sistema

> *Como um **usuário cadastrado**, eu quero **fazer login no sistema**, para que **eu possa acessar minha conta e gerenciar meus pedidos**.*

**Critérios de Aceitação:**
- [ ] O sistema deve exigir credenciais válidas para liberar o acesso
- [ ] Usuários não cadastrados não devem conseguir acessar nenhuma funcionalidade protegida
- [ ] O sistema deve exibir mensagem de erro em caso de credenciais inválidas
- [ ] Após login bem-sucedido, o usuário deve ser redirecionado para a área correspondente ao seu perfil (Cliente ou Agente)

---

## Módulo 2 — 📝 Pedidos de Aluguel (Cliente)

### US03 — Criar Pedido de Aluguel

> *Como um **cliente**, eu quero **criar um novo pedido de aluguel**, para que **eu possa solicitar um automóvel disponível no sistema**.*

**Critérios de Aceitação:**
- [ ] O cliente deve estar autenticado para criar um pedido
- [ ] O sistema deve permitir a seleção de um automóvel disponível
- [ ] O pedido deve ser registrado com status inicial "Em análise"
- [ ] O sistema deve registrar automaticamente a data de criação do pedido
- [ ] O cliente deve receber uma confirmação após a criação do pedido

---

### US04 — Consultar Pedidos de Aluguel

> *Como um **cliente**, eu quero **consultar meus pedidos de aluguel**, para que **eu possa acompanhar o status de cada solicitação**.*

**Critérios de Aceitação:**
- [ ] O cliente deve visualizar apenas seus próprios pedidos
- [ ] O sistema deve exibir o status atualizado de cada pedido (ex: Em análise, Aprovado, Cancelado)
- [ ] Deve ser possível visualizar os detalhes de cada pedido individualmente
- [ ] Os pedidos devem ser listados em ordem cronológica

---

### US05 — Modificar Pedido de Aluguel

> *Como um **cliente**, eu quero **modificar um pedido de aluguel existente**, para que **eu possa corrigir informações ou alterar o automóvel selecionado**.*

**Critérios de Aceitação:**
- [ ] O cliente só pode modificar pedidos com status "Em análise"
- [ ] O sistema deve registrar a data e hora da última modificação
- [ ] Após a modificação, o pedido deve retornar ao fluxo de análise financeira
- [ ] O sistema deve confirmar a alteração com uma mensagem de sucesso

---

### US06 — Cancelar Pedido de Aluguel

> *Como um **cliente**, eu quero **cancelar um pedido de aluguel**, para que **eu possa desistir de uma solicitação que não desejo mais**.*

**Critérios de Aceitação:**
- [ ] O cliente só pode cancelar pedidos com status "Em análise" ou "Aprovado", antes da execução do contrato
- [ ] O sistema deve solicitar confirmação antes de efetivar o cancelamento
- [ ] Após o cancelamento, o status do pedido deve ser alterado para "Cancelado"
- [ ] O automóvel vinculado deve retornar à listagem de disponíveis

---

## Módulo 3 — 🏦 Avaliação de Pedidos (Agente)

### US07 — Visualizar Pedidos para Avaliação

> *Como um **agente**, eu quero **visualizar os pedidos de aluguel submetidos**, para que **eu possa analisá-los do ponto de vista financeiro**.*

**Critérios de Aceitação:**
- [ ] O agente deve visualizar todos os pedidos com status "Em análise"
- [ ] O sistema deve exibir os dados financeiros do cliente vinculados ao pedido (profissão, rendimentos, empregadores)
- [ ] Os pedidos devem permitir visualização resumida e detalhada

---

### US08 — Avaliar Pedido de Aluguel

> *Como um **agente**, eu quero **emitir um parecer financeiro sobre um pedido**, para que **ele possa ser aprovado e encaminhado para execução do contrato**.*

**Critérios de Aceitação:**
- [ ] O agente deve poder aprovar ou reprovar um pedido
- [ ] Em caso de aprovação, o pedido deve ser atualizado para o status "Aprovado"
- [ ] Em caso de reprovação, o pedido deve ser atualizado para o status "Reprovado"
- [ ] O agente pode adicionar observações ou justificativas ao parecer

---

### US09 — Modificar Pedido de Aluguel (Agente)

> *Como um **agente**, eu quero **modificar informações de um pedido**, para que **eu possa corrigir dados antes da execução do contrato**.*

**Critérios de Aceitação:**
- [ ] O agente pode editar dados financeiros e informações complementares do pedido
- [ ] Modificações realizadas pelo agente devem ser registradas com identificação do responsável
- [ ] O histórico de modificações deve ser preservado

---

## Módulo 4 — 🚘 Automóveis e Contratos

### US10 — Registrar Automóvel

> *Como um **agente**, eu quero **registrar um automóvel no sistema**, para que **ele fique disponível para aluguel pelos clientes**.*

**Critérios de Aceitação:**
- [ ] O sistema deve registrar: matrícula, ano, marca, modelo e placa
- [ ] A placa deve ser única no sistema
- [ ] O automóvel deve ser associado a um proprietário: cliente, empresa ou banco, conforme o tipo de contrato

---

### US11 — Associar Contrato de Crédito ao Aluguel

> *Como um **banco agente**, eu quero **associar um contrato de crédito a um pedido de aluguel**, para que **o cliente possa financiar o aluguel por meio do banco**.*

**Critérios de Aceitação:**
- [ ] O contrato de crédito só pode ser concedido por um banco agente
- [ ] O sistema deve registrar os dados do contrato vinculado ao pedido de aluguel
- [ ] Um pedido pode ter no máximo um contrato de crédito associado

---

## 📊 Resumo das Histórias

| ID | Descrição | Ator | Prioridade |
|----|-----------|------|------------|
| US01 | Cadastro de Novo Usuário | Visitante | Alta |
| US02 | Login no Sistema | Usuário Cadastrado | Alta |
| US03 | Criar Pedido de Aluguel | Cliente | Alta |
| US04 | Consultar Pedidos de Aluguel | Cliente | Alta |
| US05 | Modificar Pedido de Aluguel | Cliente | Média |
| US06 | Cancelar Pedido de Aluguel | Cliente | Média |
| US07 | Visualizar Pedidos para Avaliação | Agente | Alta |
| US08 | Avaliar Pedido de Aluguel | Agente | Alta |
| US09 | Modificar Pedido de Aluguel (Agente) | Agente | Média |
| US10 | Registrar Automóvel | Agente | Alta |
| US11 | Associar Contrato de Crédito | Banco Agente | Baixa |

---

## 📌 Observações

- O sistema é exclusivamente web, acessado via Internet
- Toda operação exige autenticação prévia
- O fluxo principal segue a sequência: Cadastro → Login → Pedido → Análise Financeira → Contrato
- O sistema é dividido internamente em dois subsistemas: gestão de pedidos e contratos, e construção dinâmica das páginas web

---

## ▶️ Como executar

Em breve...
