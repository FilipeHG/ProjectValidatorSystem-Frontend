# Project Validator System - Frontend

Project Validator System - Dashboard para gerenciamento simplificado de projetos.

## 🚀 Tecnologias (Stack)

- **React 19.2.7**
- **TypeScript**
- **Vite**
- **Tailwind CSS 3**
- **Radix UI** (Dialog, Select, Tooltip, AlertDialog)
- **TanStack Query** (React Query)
- **TanStack Table** (React Table)
- **Axios**
- **React Hook Form & Zod**
- **React Hot Toast**
- **Vitest & Testing Library**
- **Playwright**

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
VITE_APP_NAME=Project Validator System
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_JWT_TOKEN=Bearer <JWT_TOKEN>
```

## 📦 Instalação

```bash
npm install
```

## 🏃‍♂️ Executando o Projeto (Desenvolvimento)

```bash
npm run dev
```

## 🌐 Integração com a API Backend

Este frontend consome a API `ProjectValidatorSystem-API`.
Certifique-se de que o backend esteja rodando.
A URL padrão configurada é: `http://localhost:3000/api`

**Swagger do Backend:** `http://localhost:3000/swagger`

## 🧪 Testes

### Testes Unitários (Vitest)
```bash
npm run test
```

### Cobertura de Testes
```bash
npm run test:cov
```

### Testes End-to-End (Playwright)
```bash
npm run test:e2e
```

### Testes End-to-End com UI (Playwright)
```bash
npm run test:e2e:ui
```

## 🏗 Arquitetura

O projeto adota uma separação pragmática e clara de responsabilidades:
- `components/`: Componentes reutilizáveis (modals, forms, tables, ui).
- `context/`: Contextos globais da aplicação.
- `hooks/`: Custom hooks, incluindo integrações com TanStack Query para isolar regras de cache e mutation.
- `layouts/`: Estruturas visuais de página (Header, Footer, Content Area).
- `pages/`: Páginas mapeadas em rotas.
- `schemas/`: Validações com Zod.
- `services/`: Requisições HTTP centralizadas usando Axios.
- `types/`: Tipos do TypeScript.
- `utils/`: Funções auxiliares (formatação de moeda, datas, etc).
