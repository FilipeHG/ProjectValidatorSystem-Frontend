import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import {
  X,
  Sparkles,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import type { Projeto } from "../../types/project.types";
import { getProjectAiAnalysis } from "../../services/projectService";

interface AiAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Projeto;
}

export default function AiAnalysisModal({
  open,
  onOpenChange,
  project,
}: AiAnalysisModalProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ai-analysis", project.id],
    queryFn: () => getProjectAiAnalysis(project.id),
    enabled: open,
    retry: 0,
  });

  const errorMessage = isError
    ? (error as any)?.response?.data?.detail ||
      (error as any)?.response?.data?.title ||
      "Falha ao conectar com o serviço de IA."
    : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-start text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-bold">
                  Análise de Inteligência Artificial
                </Dialog.Title>
                <Dialog.Description className="text-blue-100 text-sm mt-1">
                  Insights gerados para: {project.nome}
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none text-white">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </div>

          <div className="p-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">
                  A IA está analisando o projeto...
                </p>
              </div>
            )}

            {isError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">
                    Erro na Análise
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {data && !isLoading && !isError && (
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-5 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center space-x-2 mb-3">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                      Resumo do Projeto
                    </h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {data.resumoDoProjeto}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-5 border border-amber-100 dark:border-amber-800/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-semibold text-amber-900 dark:text-amber-400 text-lg">
                      Pontos de Atenção
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {data.pontosDeAtencao.map((ponto, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm text-amber-800 dark:text-amber-300"
                      >
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                        <span>{ponto}</span>
                      </li>
                    ))}
                    {data.pontosDeAtencao.length === 0 && (
                      <li className="text-sm text-amber-700">
                        Nenhum ponto de atenção identificado.
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-5 border border-emerald-100 dark:border-emerald-800/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-400 text-lg">
                      Recomendação Executiva
                    </h3>
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium leading-relaxed">
                    {data.recomendacaoExecutiva}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
