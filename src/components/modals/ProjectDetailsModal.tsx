import * as Dialog from "@radix-ui/react-dialog";
import { X, Calendar, DollarSign, FileText } from "lucide-react";
import type { Projeto } from "../../types/project.types";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";
import { useProjectMutations } from "../../hooks/useProjectMutations";

interface ProjectDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Projeto;
}

export default function ProjectDetailsModal({
  open,
  onOpenChange,
  project,
}: ProjectDetailsModalProps) {
  const { changeStatusMutation } = useProjectMutations();

  const handleStatusChange = (newStatus: string) => {
    changeStatusMutation.mutate({
      id: project.id,
      payload: { status: newStatus as any },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white">
                  {project.nome}
                </Dialog.Title>
                <div className="mt-2 flex items-center space-x-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === "Aprovado"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : project.status === "Em andamento"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : project.status === "Encerrado"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : project.status === "Cancelado"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.riscoCalculado === "Baixo"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : project.riscoCalculado === "Médio"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    Risco {project.riscoCalculado}
                  </span>
                </div>
              </div>
              <Dialog.Close asChild>
                <button className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
                  <X className="h-5 w-5 text-slate-500" />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Data de Início
                  </p>
                  <p className="text-base text-slate-900 dark:text-slate-100">
                    {formatDate(project.dataDeInicio)}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Previsão de Término
                  </p>
                  <p className="text-base text-slate-900 dark:text-slate-100">
                    {formatDate(project.previsaoDeTermino)}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Orçamento Total
                  </p>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(project.orcamentoTotal)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-slate-400" />
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Descrição
                </h4>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap border border-slate-100 dark:border-slate-700">
                {project.descricao}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
                Ações Rápidas
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.status === "Em análise" && (
                  <button
                    onClick={() => handleStatusChange("Aprovado")}
                    className="px-3 py-1.5 text-sm font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 transition-colors"
                  >
                    Aprovar Projeto
                  </button>
                )}
                {project.status === "Aprovado" && (
                  <button
                    onClick={() => handleStatusChange("Em andamento")}
                    className="px-3 py-1.5 text-sm font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:hover:bg-purple-800 transition-colors"
                  >
                    Iniciar Projeto
                  </button>
                )}
                {project.status === "Em andamento" && (
                  <button
                    onClick={() => handleStatusChange("Encerrado")}
                    className="px-3 py-1.5 text-sm font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800 transition-colors"
                  >
                    Encerrar Projeto
                  </button>
                )}
                {project.status !== "Cancelado" &&
                  project.status !== "Encerrado" && (
                    <button
                      onClick={() => handleStatusChange("Cancelado")}
                      className="px-3 py-1.5 text-sm font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800 transition-colors"
                    >
                      Cancelar Projeto
                    </button>
                  )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
