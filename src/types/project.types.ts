export const ProjectStatus = {
  EmAnalise: "Em análise",
  Aprovado: "Aprovado",
  EmAndamento: "Em andamento",
  Encerrado: "Encerrado",
  Cancelado: "Cancelado",
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectRisk = {
  Baixo: "Baixo",
  Medio: "Médio",
  Alto: "Alto",
} as const;

export type ProjectRisk = (typeof ProjectRisk)[keyof typeof ProjectRisk];

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

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
