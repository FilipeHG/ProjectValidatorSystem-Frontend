import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import type { Projeto } from "../../types/project.types";
import { projectFormSchema } from "../../schemas/project.schema";
import type { ProjectFormData } from "../../schemas/project.schema";
import { useProjectMutations } from "../../hooks/useProjectMutations";

interface ProjectFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectToEdit?: Projeto | null;
}

export default function ProjectFormModal({
  open,
  onOpenChange,
  projectToEdit,
}: ProjectFormModalProps) {
  const isEdit = !!projectToEdit;
  const { createProjectMutation, updateProjectMutation, changeStatusMutation } =
    useProjectMutations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema) as any,
  });

  useEffect(() => {
    if (open) {
      if (isEdit && projectToEdit) {
        reset({
          nome: projectToEdit.nome,
          dataDeInicio: projectToEdit.dataDeInicio.split("T")[0],
          previsaoDeTermino: projectToEdit.previsaoDeTermino.split("T")[0],
          orcamentoTotal: projectToEdit.orcamentoTotal,
          descricao: projectToEdit.descricao,
        });
      } else {
        reset({
          nome: "",
          dataDeInicio: "",
          previsaoDeTermino: "",
          orcamentoTotal: 0,
          descricao: "",
        });
      }
    }
  }, [open, isEdit, projectToEdit, reset]);

  const onSubmit = (data: ProjectFormData) => {
    if (isEdit && projectToEdit) {
      updateProjectMutation.mutate(
        { id: projectToEdit.id, payload: data },
        {
          onSuccess: () => onOpenChange(false),
        },
      );
    } else {
      createProjectMutation.mutate(data, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  const isPending =
    createProjectMutation.isPending || updateProjectMutation.isPending;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">
              {isEdit ? "Editar Projeto" : "Novo Projeto"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-500 dark:text-slate-400">
              {isEdit
                ? "Faça as alterações necessárias e salve."
                : "Preencha os dados para adicionar um novo projeto."}
            </Dialog.Description>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit as any)}
            className="space-y-4 py-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300"
              >
                Nome do Projeto
              </label>
              <input
                id="nome"
                {...register("nome")}
                className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100"
              />
              {errors.nome && (
                <span className="text-xs text-red-500">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="dataDeInicio"
                  className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300"
                >
                  Data de Início
                </label>
                <input
                  id="dataDeInicio"
                  type="date"
                  {...register("dataDeInicio")}
                  className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                />
                {errors.dataDeInicio && (
                  <span className="text-xs text-red-500">
                    {errors.dataDeInicio.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="previsaoDeTermino"
                  className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300"
                >
                  Previsão de Término
                </label>
                <input
                  id="previsaoDeTermino"
                  type="date"
                  {...register("previsaoDeTermino")}
                  className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                />
                {errors.previsaoDeTermino && (
                  <span className="text-xs text-red-500">
                    {errors.previsaoDeTermino.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="orcamentoTotal"
                className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300"
              >
                Orçamento Total (R$)
              </label>
              <input
                id="orcamentoTotal"
                type="number"
                step="0.01"
                {...register("orcamentoTotal")}
                className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
              />
              {errors.orcamentoTotal && (
                <span className="text-xs text-red-500">
                  {errors.orcamentoTotal.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="descricao"
                className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300"
              >
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={3}
                {...register("descricao")}
                className="flex w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 resize-none"
              />
              {errors.descricao && (
                <span className="text-xs text-red-500">
                  {errors.descricao.message}
                </span>
              )}
            </div>

            {isEdit && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <label className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300 block">
                  Alterar Status
                </label>
                <select
                  value={projectToEdit.status}
                  onChange={(e) => {
                    changeStatusMutation.mutate({
                      id: projectToEdit.id,
                      payload: { status: e.target.value as any },
                    });
                  }}
                  className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100"
                >
                  <option className="dark:bg-slate-800" value="Em análise">Em análise</option>
                  <option className="dark:bg-slate-800" value="Aprovado">Aprovado</option>
                  <option className="dark:bg-slate-800" value="Em andamento">Em andamento</option>
                  <option className="dark:bg-slate-800" value="Encerrado">Encerrado</option>
                  <option className="dark:bg-slate-800" value="Cancelado">Cancelado</option>
                </select>
                <p className="text-xs text-slate-500">
                  O status é alterado imediatamente ao selecionar.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? "Salvar Alterações" : "Criar Projeto"}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:ring-offset-slate-950 dark:focus:ring-slate-300">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
