# ProjectValidatorSystem-Frontend Bootstrap

You are the Lead Frontend Architect and Senior React Engineer responsible for implementing the complete ProjectValidatorSystem-Frontend.

Project Name: ProjectValidatorSystem-Frontend  
Label: Project Validator System  
Description: Project Validator System - Dashboard para gerenciamento simplificado de projetos

The frontend must consume the existing backend:

ProjectValidatorSystem-API

Backend default URL:

```text
http://localhost:3000/api
```

Swagger:

```text
http://localhost:3000/swagger
```

---

# 1. Main Objective

Create a modern responsive dashboard using:

- React 19.2.7
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- TanStack Query
- Axios
- TanStack Table
- React Hook Form
- Zod
- React Hot Toast
- Vitest
- Testing Library
- Playwright

The application must allow users to:

- List projects
- Create projects
- Edit projects
- Delete projects
- View project details
- Change project status
- Request AI analysis
- View AI analysis inside a modal

---

# 2. React Version

Use the latest official React version available in npm at the time of project creation.

For this project, use:

```bash
react@19.2.7
react-dom@19.2.7
```
Install explicitly: npm install react@19.2.7 react-dom@19.2.7

Do not use React 20, but is not yet available as an official stable release.

---

# 3. Project Creation

Create the project using Vite:

```bash
npm create vite@latest ProjectValidatorSystem-Frontend -- --template react-ts
cd ProjectValidatorSystem-Frontend
```

Install dependencies:

```bash
npm install
```

Install UI, HTTP, state and validation dependencies:

```bash
npm install axios @tanstack/react-query @tanstack/react-table react-hook-form zod @hookform/resolvers react-hot-toast
```

Install Radix UI:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip @radix-ui/react-alert-dialog
```

Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install testing tools:

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom playwright
```

Install icons:

```bash
npm install lucide-react
```

---

# 4. Environment Files

Create:

```text
.env
.env.example
```

`.env.example`:

```env
VITE_APP_NAME=Project Validator System
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_JWT_TOKEN=change-me
```

`.env`:

```env
VITE_APP_NAME=Project Validator System
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_JWT_TOKEN=Bearer <JWT_TOKEN>
```

Rules:

- Never hardcode API URL inside services.
- Never hardcode JWT token inside components.
- Always read from `import.meta.env`.

---

# 5. Required Backend Token

The backend uses a static JWT Bearer Token.

All protected requests must send:

```http
Authorization: Bearer <token>
```

The Axios client must automatically attach this header.

---

# 6. Required Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:host": "vite --host 0.0.0.0",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:cov": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "lint": "eslint .",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\""
  }
}
```

---

# 7. Official Architecture

Use a pragmatic frontend architecture with clear separation between:

- Pages
- Components
- Services
- Hooks
- Schemas
- Types
- Layouts
- Utils

Do not place API calls directly inside components.

Do not place business validation directly inside JSX.

Do not duplicate backend rules unnecessarily.

---

# 8. Required Folder Structure

Create the following structure:

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
├── hooks/
│   ├── useProjects.ts
│   └── useProjectMutations.ts
│
├── services/
│   ├── apiClient.ts
│   └── projectService.ts
│
├── pages/
│   └── ProjectsDashboardPage.tsx
│
├── layouts/
│   └── DashboardLayout.tsx
│
├── context/
│   └── AppContext.tsx
│
├── schemas/
│   └── project.schema.ts
│
├── types/
│   └── project.types.ts
│
├── utils/
│   ├── currencyFormatter.ts
│   ├── dateFormatter.ts
│   └── errorFormatter.ts
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 9. Backend API Contract

Consume these endpoints:

```http
GET    /projects
POST   /projects
GET    /projects/{id}
PATCH  /projects/{id}
DELETE /projects/{id}
PATCH  /projects/{id}/status
GET    /projects/{id}/ai-analysis
GET    /health
```

All `/projects` endpoints require JWT.

---

# 10. Project Types

Create:

```text
src/types/project.types.ts
```

```ts
export const ProjectStatus = {
  EmAnalise: 'Em análise',
  Aprovado: 'Aprovado',
  EmAndamento: 'Em andamento',
  Encerrado: 'Encerrado',
  Cancelado: 'Cancelado',
} as const;

export type ProjectStatus =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectRisk = {
  Baixo: 'Baixo',
  Medio: 'Médio',
  Alto: 'Alto',
} as const;

export type ProjectRisk =
  (typeof ProjectRisk)[keyof typeof ProjectRisk];

export interface Projeto {
  id: string;
  nome: string;
  dataDeInicio: string;
  previsaoDeTermino: string;
  orcamentoTotal: number;
  descricao: string;
  status: ProjectStatus;
  riscoCalculado: ProjectRisk;
  dtCriacao?: string;
  dtAtualizacao?: string;
}

export interface CreateProjectPayload {
  nome: string;
  dataDeInicio: string;
  previsaoDeTermino: string;
  orcamentoTotal: number;
  descricao: string;
}

export interface UpdateProjectPayload {
  nome?: string;
  dataDeInicio?: string;
  previsaoDeTermino?: string;
  orcamentoTotal?: number;
  descricao?: string;
}

export interface ChangeProjectStatusPayload {
  status: ProjectStatus;
}

export interface AiAnalysisResponse {
  resumoDoProjeto: string;
  pontosDeAtencao: string[];
  recomendacaoExecutiva: string;
}
```

---

# 11. Validation Schema

Create:

```text
src/schemas/project.schema.ts
```

```ts
import { z } from 'zod';

export const projectFormSchema = z
  .object({
    nome: z.string().trim().min(1, 'Nome é obrigatório.'),
    dataDeInicio: z.string().min(1, 'Data de início é obrigatória.'),
    previsaoDeTermino: z.string().min(1, 'Previsão de término é obrigatória.'),
    orcamentoTotal: z.coerce
      .number()
      .positive('Orçamento deve ser maior que zero.'),
    descricao: z.string().trim().min(1, 'Descrição é obrigatória.'),
  })
  .refine(
    (data) =>
      new Date(data.previsaoDeTermino).getTime() >=
      new Date(data.dataDeInicio).getTime(),
    {
      message: 'A previsão de término deve ser maior ou igual à data de início.',
      path: ['previsaoDeTermino'],
    },
  );

export const changeStatusSchema = z.object({
  status: z.enum([
    'Em análise',
    'Aprovado',
    'Em andamento',
    'Encerrado',
    'Cancelado',
  ]),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
```

---

# 12. Axios Client

Create:

```text
src/services/apiClient.ts
```

```ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_API_JWT_TOKEN;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});
```

---

# 13. Project Service

Create:

```text
src/services/projectService.ts
```

```ts
import { apiClient } from './apiClient';
import {
  AiAnalysisResponse,
  ChangeProjectStatusPayload,
  CreateProjectPayload,
  Projeto,
  UpdateProjectPayload,
} from '../types/project.types';

export async function getProjects(page: number, limit: number) {
  const response = await apiClient.get<Projeto[]>('/projects', {
    params: { page, limit },
  });

  return response.data;
}

export async function getProjectById(id: string) {
  const response = await apiClient.get<Projeto>(`/projects/${id}`);
  return response.data;
}

export async function createProject(payload: CreateProjectPayload) {
  const response = await apiClient.post<Projeto>('/projects', payload);
  return response.data;
}

export async function updateProject(id: string, payload: UpdateProjectPayload) {
  const response = await apiClient.patch<Projeto>(`/projects/${id}`, payload);
  return response.data;
}

export async function deleteProject(id: string) {
  await apiClient.delete(`/projects/${id}`);
}

export async function changeProjectStatus(
  id: string,
  payload: ChangeProjectStatusPayload,
) {
  const response = await apiClient.patch<Projeto>(
    `/projects/${id}/status`,
    payload,
  );

  return response.data;
}

export async function getProjectAiAnalysis(id: string) {
  const response = await apiClient.get<AiAnalysisResponse>(
    `/projects/${id}/ai-analysis`,
  );

  return response.data;
}
```

---

# 14. React Query Hooks

Create:

```text
src/hooks/useProjects.ts
```

```ts
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/projectService';

export function useProjects(page: number, limit: number) {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => getProjects(page, limit),
  });
}
```

Create:

```text
src/hooks/useProjectMutations.ts
```

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  changeProjectStatus,
  createProject,
  deleteProject,
  updateProject,
} from '../services/projectService';

function getBackendError(error: unknown) {
  const anyError = error as any;
  return (
    anyError?.response?.data?.detail ||
    anyError?.response?.data?.title ||
    'Erro inesperado.'
  );
}

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const invalidateProjects = () =>
    queryClient.invalidateQueries({ queryKey: ['projects'] });

  return {
    createProjectMutation: useMutation({
      mutationFn: createProject,
      onSuccess: () => {
        toast.success('Projeto criado com sucesso.');
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),

    updateProjectMutation: useMutation({
      mutationFn: ({ id, payload }: any) => updateProject(id, payload),
      onSuccess: () => {
        toast.success('Projeto atualizado com sucesso.');
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),

    deleteProjectMutation: useMutation({
      mutationFn: deleteProject,
      onSuccess: () => {
        toast.success('Projeto removido com sucesso.');
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),

    changeStatusMutation: useMutation({
      mutationFn: ({ id, payload }: any) => changeProjectStatus(id, payload),
      onSuccess: () => {
        toast.success('Status atualizado com sucesso.');
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),
  };
}
```

---

# 15. Layout Requirements

Create a single dashboard page with:

- Header
- Body
- Footer

Header must contain:

- Project name
- Application label
- API status indicator if possible

Body must contain:

- Button: Adicionar Novo Projeto
- Projects grid
- Pagination controls
- Page size select: 10, 30, 50, 100

Footer must contain:

- ProjectValidatorSystem
- Version
- Technology stack summary

---

# 16. Grid Requirements

Use TanStack Table.

The list must display:

- Nome do projeto
- Status
- Risco calculado
- Orçamento
- Data de início
- Previsão de término
- Ações disponíveis

Do not display:

- dtCriacao
- dtAtualizacao

Each row must have actions:

- View details
- Edit
- Delete
- AI Analysis

Use icons from `lucide-react`.

Suggested icons:

- Eye
- Pencil
- Trash2
- Sparkles

---

# 17. Project Form Modal

Use Radix Dialog.

The form must support:

- Create
- Edit

Fields:

- Nome
- Data de início
- Previsão de término
- Orçamento total
- Descrição

For create:

- Do not show status field.
- Backend defines status as `Em análise`.

For edit:

- Show status as select box with:

```text
Em análise
Aprovado
Em andamento
Encerrado
Cancelado
```

Status changes must call:

```http
PATCH /projects/{id}/status
```

Project field changes must call:

```http
PATCH /projects/{id}
```

---

# 18. Details Modal

The details modal must show:

- Nome
- Status atual
- Risco calculado
- Orçamento total
- Data de início
- Previsão de término
- Descrição

Actions:

- Avançar status
- Cancelar projeto
- Gerar análise com IA

Status transition must follow backend rules.

If backend rejects transition, display backend error message.

---

# 19. AI Analysis Modal

When clicking AI Analysis:

Call:

```http
GET /projects/{id}/ai-analysis
```

Show modal with:

- Resumo do projeto
- Pontos de atenção
- Recomendação executiva

Show loading state while request is running.

Show backend error message when request fails.

---

# 20. Toast Requirements

Use React Hot Toast.

Add to root:

```tsx
<Toaster position="top-right" />
```

Show success messages for:

- Project created
- Project updated
- Project deleted
- Status changed
- AI analysis generated

Show error messages from backend when available.

---

# 21. Empty, Loading and Error States

The UI must handle:

- Loading
- Empty table
- Backend error
- Validation error
- AI provider error
- Network error

Empty state message:

```text
Nenhum projeto encontrado.
```

---

# 22. Styling Requirements

Use Tailwind CSS.

The UI must be:

- Modern
- Responsive
- Clean
- Dashboard-like
- Professional

Use:

- Cards
- Soft shadows
- Rounded corners
- Status badges
- Risk badges
- Responsive table container

Suggested risk colors:

- Baixo: green
- Médio: yellow
- Alto: red

Suggested status badges:

- Em análise: gray
- Aprovado: blue
- Em andamento: purple
- Encerrado: green
- Cancelado: red

---

# 23. Unit Testing Requirements

Use:

- Vitest
- Testing Library
- Jest DOM

Test:

- Project form validation
- Empty state
- Loading state
- Error rendering
- Table rendering
- Status badge rendering
- Risk badge rendering

Command:

```bash
npm run test
```

Coverage command:

```bash
npm run test:cov
```

---

# 24. E2E Testing Requirements

Use Playwright.

Test flows:

- Load dashboard
- List projects
- Create project
- Edit project
- Delete project
- Open details modal
- Request AI analysis

Command:

```bash
npm run test:e2e
```

---

# 25. Required README

Generate a README.md including:

- Project name
- Description
- Stack
- Environment variables
- Install commands
- Run commands
- Backend API dependency
- Swagger URL
- Test commands
- Architecture summary

---

# 26. Final Acceptance Criteria

The implementation is complete only when:

- Dashboard loads successfully
- Projects are listed
- Pagination works
- Page size select works with 10, 30, 50, 100
- Create project works
- Edit project works
- Delete project works
- Details modal works
- Status change works
- AI analysis modal works
- Backend errors are displayed
- Toasts are displayed
- Form validation works
- JWT is sent automatically
- `.env.example` exists
- README exists
- Unit tests exist
- E2E tests exist
- Build completes successfully

---

# 27. Final Command For Antigravity

After creating this file, execute:

```text
Read PROJECT_FRONTEND_BOOTSTRAP.md and execute the workflow completely.
```