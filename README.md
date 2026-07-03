# 🚀 Project Validator System - Frontend

> Project Validator System — Dashboard para gerenciamento simplificado de projetos.

---

## 📋 Overview

O **ProjectValidatorSystem-Frontend** é uma aplicação web desenvolvida em **React + TypeScript** responsável por consumir a API **ProjectValidatorSystem-API** e fornecer uma interface moderna para gerenciamento de projetos.

A aplicação permite:

- 📄 Listar projetos
- ➕ Criar projetos
- ✏️ Editar projetos
- 🗑️ Excluir projetos
- 🔍 Visualizar detalhes
- 🔄 Alterar status
- 🤖 Solicitar análise inteligente com IA
- 📊 Visualizar risco calculado
- 📑 Paginação de resultados
- 🔐 Consumir API protegida por JWT

---

## ✨ Funcionalidades

### Dashboard

- Listagem paginada de projetos
- Controle de quantidade por página (10, 30, 50 e 100)
- Exibição clara de status e risco calculado
- Indicadores visuais para riscos e status

### Projetos

- Cadastro de novos projetos
- Edição de projetos existentes
- Exclusão de projetos
- Visualização detalhada

### Workflow

- Alteração de status respeitando as regras do backend
- Cancelamento de projetos
- Exibição de mensagens de sucesso e erro

### Inteligência Artificial

- Solicitação de análise via IA
- Exibição de:
  - Resumo do projeto
  - Pontos de atenção
  - Recomendação executiva

---

## 🛠 Tecnologias Utilizadas

### Frontend

- React 19.2.7
- TypeScript 5.9.3
- Vite 8.1.1

### UI & Design

- Tailwind CSS 3
- Radix UI
- Lucide React

### Integração e Estado

- TanStack Query (React Query)
- Axios

### Formulários e Validação

- React Hook Form
- Zod
- @hookform/resolvers

### Feedback ao Usuário

- React Hot Toast

### Grid e Tabelas

- TanStack Table

### Testes

- Vitest
- Testing Library
- Playwright

---

## 🌳 Git Flow

Branches oficiais:

| Branch | Objetivo |
|----------|----------|
| master | Produção |
| develop | Desenvolvimento / Homologação |

Fluxo adotado:

```text
feature/*
    ↓
develop
    ↓
Pull Request
    ↓
master
```

Nunca desenvolver diretamente na branch:

```text
master
```

---

## 🔗 Dependência do Backend

Este frontend depende da API:

```text
ProjectValidatorSystem-API
```

URL local padrão:

```text
http://localhost:3000/api
```

Swagger:

```text
http://localhost:3000/swagger
```

Antes de iniciar o frontend, o backend deve estar executando.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`.

### .env.example

```env
VITE_APP_NAME=Project Validator System

VITE_API_BASE_URL=http://localhost:3000/api

VITE_API_JWT_TOKEN=change-me
```

### .env

```env
VITE_APP_NAME=Project Validator System

VITE_API_BASE_URL=http://localhost:3000/api

VITE_API_JWT_TOKEN=Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 🔐 Autenticação

O backend utiliza autenticação JWT.

Todas as chamadas protegidas enviam automaticamente:

```http
Authorization: Bearer TOKEN
```

A configuração é realizada centralizadamente em:

```text
src/services/apiClient.ts
```

---

## 📦 Instalação

### Clonar o projeto

```bash
git clone https://github.com/FilipeHG/ProjectValidatorSystem-Frontend.git

cd ProjectValidatorSystem-Frontend
```

### Instalar dependências

```bash
npm install
```

---

## ▶️ Executando Localmente

### Desenvolvimento

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

### Rede Local

```bash
npm run dev:host
```

### Preview

```bash
npm run preview
```

---

## 🏗 Build de Produção

Gerar build:

```bash
npm run build
```

Arquivos gerados:

```text
dist/
```

Visualizar build:

```bash
npm run preview
```

---

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```

### Desenvolvimento (Rede Local)

```bash
npm run dev:host
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Formatação

```bash
npm run format
```

### Testes

```bash
npm run test
```

### Cobertura

```bash
npm run test:cov
```

### End-to-End

```bash
npm run test:e2e
```

### End-to-End UI

```bash
npm run test:e2e:ui
```

---

## 📊 Funcionalidades da Tela Principal

A tela principal possui:

### Header

- Nome da aplicação
- Identificação do sistema

### Body

- Botão para adicionar projeto
- Grid de projetos
- Paginação
- Controle de quantidade por página

### Footer

- Informações da aplicação
- Versão
- Tecnologias utilizadas

---

## 📄 Grid de Projetos

A listagem exibe:

- Nome do projeto
- Status
- Risco calculado
- Orçamento total
- Data de início
- Previsão de término
- Ações disponíveis

Ações disponíveis:

- 🔍 Visualizar detalhes
- ✏️ Editar
- 🗑️ Excluir
- 🤖 Análise IA

---

## 📋 Detalhes do Projeto

O painel de detalhes exibe:

- Nome
- Status atual
- Risco calculado
- Orçamento total
- Data de início
- Previsão de término
- Descrição

Ações disponíveis:

- Alterar status
- Cancelar projeto
- Gerar análise IA

---

## 🤖 Integração com IA

A funcionalidade de análise inteligente consome:

```http
GET /projects/{id}/ai-analysis
```

Resposta esperada:

```json
{
  "resumoDoProjeto": "",
  "pontosDeAtencao": [],
  "recomendacaoExecutiva": ""
}
```

A análise é exibida em um modal dedicado.

O frontend é totalmente desacoplado da tecnologia de IA utilizada pelo backend.

---

## 📝 Formulários

Implementados com:

- React Hook Form
- Zod

Validações:

- Nome obrigatório
- Datas obrigatórias
- Descrição obrigatória
- Orçamento maior que zero
- Data final maior ou igual à data inicial

Mensagens de erro são exibidas diretamente ao usuário.

---

## 🔔 Notificações

Biblioteca utilizada:

```text
React Hot Toast
```

Mensagens exibidas para:

- Projeto criado
- Projeto atualizado
- Projeto removido
- Status alterado
- Erros de validação
- Erros retornados pelo backend

---

## 🌐 Integração REST

Toda comunicação com a API é centralizada em:

```text
src/services/projectService.ts
```

Os componentes não realizam chamadas HTTP diretamente.

Toda lógica de integração é abstraída pela camada de serviços.

---

## 📁 Estrutura do Projeto

```text
src/
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── styles/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   ├── modals/
│   └── tables/
│
├── context/
│
├── hooks/
│   ├── useProjects.ts
│   └── useProjectMutations.ts
│
├── layouts/
│
├── pages/
│
├── schemas/
│
├── services/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── types/
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🧪 Testes

### Testes Unitários

```bash
npm run test
```

Valida:

- Componentes
- Hooks
- Schemas
- Utilitários
- Formulários

---

### Cobertura

```bash
npm run test:cov
```

Relatório:

```text
coverage/
```

Abrir:

```text
coverage/index.html
```

---

### Testes End-to-End

```bash
npm run test:e2e
```

Fluxos cobertos:

- Dashboard
- CRUD de projetos
- Alteração de status
- Paginação
- Integração com backend
- Análise IA

---

## 📱 Responsividade

A interface foi desenvolvida para funcionar em:

- Desktop
- Notebook
- Tablet
- Mobile

Resoluções testadas:

```text
1920px
1366px
768px
390px
```

---

## 🚦 Status do Projeto

Versão atual:

```text
v1.0.0
```

Status:

```text
Completed
```

A aplicação atende todos os requisitos definidos para o desafio técnico.

---

## 🔮 Melhorias Futuras

Possíveis evoluções:

- Dark Mode
- Exportação para Excel
- Filtros avançados
- Ordenação dinâmica por coluna
- Dashboard com métricas
- Internacionalização (i18n)
- Atualização em tempo real com WebSockets
- Controle de acesso por perfil (RBAC)

---

## ❤️ Desenvolvido com

- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Axios
- React Hot Toast
- Vitest
- Playwright
- ProjectValidatorSystem-API

---

## 👨‍💻 Autor

**Filipe Henrique Gonçalves**

Senior Full Stack Software Engineer

AI-First Software Engineering