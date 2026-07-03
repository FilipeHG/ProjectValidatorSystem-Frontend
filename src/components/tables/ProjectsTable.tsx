import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { useProjectMutations as useMutations } from "../../hooks/useProjectMutations";
import type { Projeto } from "../../types/project.types";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";
import ProjectDetailsModal from "../modals/ProjectDetailsModal";
import ProjectFormModal from "../modals/ProjectFormModal";
import AiAnalysisModal from "../modals/AiAnalysisModal";

export default function ProjectsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: responseData, isLoading, isError } = useProjects(page, limit);
  const projects = responseData?.data;
  const total = responseData?.total || 0;

  const { deleteProjectMutation } = useMutations();

  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleView = (project: Projeto) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleEdit = (project: Projeto) => {
    setSelectedProject(project);
    setIsEditOpen(true);
  };

  const handleAi = (project: Projeto) => {
    setSelectedProject(project);
    setIsAiOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome do Projeto",
      cell: (info: any) => (
        <span className="font-medium">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => {
        const val = info.getValue();
        let color =
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        if (val === "Aprovado")
          color =
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        if (val === "Em andamento")
          color =
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
        if (val === "Encerrado")
          color =
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        if (val === "Cancelado")
          color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
          >
            {val}
          </span>
        );
      },
    },
    {
      accessorKey: "riscoCalculado",
      header: "Risco",
      cell: (info: any) => {
        const val = info.getValue();
        let color =
          "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
        if (val === "Baixo")
          color =
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        if (val === "Médio")
          color =
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        if (val === "Alto")
          color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
          >
            {val}
          </span>
        );
      },
    },
    {
      accessorKey: "orcamentoTotal",
      header: "Orçamento",
      cell: (info: any) => formatCurrency(info.getValue()),
    },
    {
      accessorKey: "dataDeInicio",
      header: "Data de Início",
      cell: (info: any) => formatDate(info.getValue()),
    },
    {
      accessorKey: "previsaoDeTermino",
      header: "Previsão de Término",
      cell: (info: any) => formatDate(info.getValue()),
    },
    {
      id: "actions",
      header: "Ações",
      cell: (info: any) => {
        const project = info.row.original;
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleView(project)}
              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
              title="Ver Detalhes"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEdit(project)}
              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
              title="Editar"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAi(project)}
              className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
              title="Análise IA"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: projects || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Carregando projetos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 dark:bg-red-900/10">
        <p>Erro ao carregar projetos.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                >
                  Nenhum projeto encontrado.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Mostrar
          </span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {[10, 30, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            por página
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Página {page}
          </span>
          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={!projects || (page * limit >= total)}
            className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima
          </button>
        </div>
      </div>

      {selectedProject && (
        <>
          <ProjectDetailsModal
            project={selectedProject}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          />
          <ProjectFormModal
            projectToEdit={selectedProject}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          <AiAnalysisModal
            project={selectedProject}
            open={isAiOpen}
            onOpenChange={setIsAiOpen}
          />
        </>
      )}
    </div>
  );
}
