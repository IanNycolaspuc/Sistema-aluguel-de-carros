# 🎓 Sistema de Matrículas — PUC Minas

> **Disciplina:** Laboratório de Desenvolvimento de Software  
> **Curso:** Engenharia de Software — 4º Período  
> **Professor:** João Paulo Carneiro Aramuni  

---

## 📖 Sobre o Projeto

Sistema desenvolvido para informatizar o processo de matrículas da Universidade MBP. A secretaria gerencia disciplinas e períodos de matrícula, alunos se inscrevem nas disciplinas e professores consultam suas turmas. Após a matrícula, o sistema notifica automaticamente o setor de cobranças.

---

## 👥 Atores do Sistema

| Ator | Descrição |
|---|---|
| **Aluno** | Realiza e cancela matrículas em disciplinas |
| **Professor** | Consulta os alunos matriculados em suas disciplinas |
| **Secretaria** | Gerencia cursos, disciplinas e períodos de matrícula |
| **Sistema de Cobranças** | Sistema externo notificado após cada matrícula |

---

## 📝 Histórias de Usuário

---

### US01 - Login no sistema

Como usuário do sistema,  
quero fazer login com e-mail e senha,  
para acessar as funcionalidades disponíveis para o meu perfil.

**Critérios de aceitação:**
- O sistema deve solicitar e-mail e senha para autenticação
- Credenciais inválidas devem exibir mensagem de erro
- Cada perfil deve ter acesso apenas às suas funcionalidades

---

### US02 - Realizar matrícula

Como aluno,  
quero me matricular em disciplinas durante o período de matrículas,  
para cursar as matérias do próximo semestre.

**Critérios de aceitação:**
- O aluno pode se matricular em até 4 disciplinas obrigatórias e 2 optativas
- Matrículas fora do período definido não devem ser permitidas
- Disciplinas que já atingiram 60 alunos não aceitam novas matrículas
- Após a matrícula, o sistema de cobranças deve ser notificado automaticamente

---

### US03 - Cancelar matrícula

Como aluno,  
quero cancelar minha matrícula em uma disciplina,  
para ajustar minhas escolhas antes do encerramento do período.

**Critérios de aceitação:**
- O cancelamento só é permitido durante o período de matrículas
- A vaga deve ser liberada para outros alunos após o cancelamento
- O sistema deve confirmar o cancelamento com sucesso

---

### US04 - Consultar disciplinas disponíveis

Como aluno,  
quero visualizar as disciplinas disponíveis para o semestre,  
para escolher as que desejo cursar antes de me matricular.

**Critérios de aceitação:**
- Deve exibir nome da disciplina, professor responsável e vagas disponíveis
- Disciplinas com vagas esgotadas devem ser indicadas como encerradas
- O aluno deve conseguir ver em quais disciplinas já está matriculado

---

### US05 - Consultar alunos matriculados

Como professor,  
quero ver a lista de alunos matriculados nas minhas disciplinas,  
para acompanhar as turmas do semestre.

**Critérios de aceitação:**
- O professor visualiza apenas as disciplinas que ele leciona
- A lista deve exibir nome e matrícula de cada aluno

---

### US06 - Gerenciar currículo semestral

Como secretaria,  
quero cadastrar disciplinas e definir o período de matrículas,  
para que os alunos possam realizar suas inscrições no semestre.

**Critérios de aceitação:**
- Deve ser possível cadastrar disciplinas com nome, código e professor responsável
- Deve ser possível definir início e fim do período de matrículas
- Ao encerrar o período, disciplinas com menos de 3 alunos devem ser canceladas automaticamente

---

### US07 - Gerenciar alunos e professores

Como secretaria,  
quero cadastrar e manter os dados de alunos e professores no sistema,  
para que todos possam acessar o sistema com suas informações corretas.

**Critérios de aceitação:**
- Deve ser possível cadastrar alunos com nome, matrícula e curso
- Deve ser possível cadastrar professores com nome e disciplinas que leciona
- Deve ser possível consultar e atualizar os dados cadastrados

---

## 📌 Resumo das Histórias

| ID | História | Ator |
|---|---|---|
| US01 | Login no sistema | Aluno / Professor / Secretaria |
| US02 | Realizar matrícula | Aluno |
| US03 | Cancelar matrícula | Aluno |
| US04 | Consultar disciplinas disponíveis | Aluno |
| US05 | Consultar alunos matriculados | Professor |
| US06 | Gerenciar currículo semestral | Secretaria |
| US07 | Gerenciar alunos e professores | Secretaria |

---

## 🛠️ Tecnologias

- **Linguagem:** Java
- **Interface:** Linha de Comando (CLI)
- **Persistência:** Arquivos

---

## ▶️ Como executar

Em breve...
