import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  changeProjectStatus,
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";

function getBackendError(error: unknown) {
  const anyError = error as any;
  return (
    anyError?.response?.data?.detail ||
    anyError?.response?.data?.title ||
    "Erro inesperado."
  );
}

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const invalidateProjects = () =>
    queryClient.invalidateQueries({ queryKey: ["projects"] });

  return {
    createProjectMutation: useMutation({
      mutationFn: createProject,
      onSuccess: () => {
        toast.success("Projeto criado com sucesso.");
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),

    updateProjectMutation: useMutation({
      mutationFn: ({ id, payload }: any) => updateProject(id, payload),
      onSuccess: () => {
        toast.success("Projeto atualizado com sucesso.");
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),

    deleteProjectMutation: useMutation({
      mutationFn: deleteProject,
      onSuccess: () => {
        toast.success("Projeto removido com sucesso.");
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),

    changeStatusMutation: useMutation({
      mutationFn: ({ id, payload }: any) => changeProjectStatus(id, payload),
      onSuccess: () => {
        toast.success("Status atualizado com sucesso.");
        invalidateProjects();
      },
      onError: (error) => toast.error(getBackendError(error)),
    }),
  };
}
