import { apiClient } from "./apiClient";
import type {
  AiAnalysisResponse,
  ChangeProjectStatusPayload,
  CreateProjectPayload,
  Projeto,
  UpdateProjectPayload,
  PaginatedResponse,
} from "../types/project.types";

export async function getProjects(page: number, limit: number) {
  const response = await apiClient.get<PaginatedResponse<Projeto>>("/projects", {
    params: { page, limit },
  });

  return response.data;
}

export async function getProjectById(id: string) {
  const response = await apiClient.get<Projeto>(`/projects/${id}`);
  return response.data;
}

export async function createProject(payload: CreateProjectPayload) {
  const response = await apiClient.post<Projeto>("/projects", payload);
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
