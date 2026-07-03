import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/projectService";

export function useProjects(page: number, limit: number) {
  return useQuery({
    queryKey: ["projects", page, limit],
    queryFn: () => getProjects(page, limit),
  });
}
