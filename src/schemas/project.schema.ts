import { z } from "zod";

export const projectFormSchema = z
  .object({
    nome: z.string().trim().min(1, "Nome é obrigatório."),
    dataDeInicio: z.string().min(1, "Data de início é obrigatória."),
    previsaoDeTermino: z.string().min(1, "Previsão de término é obrigatória."),
    orcamentoTotal: z.coerce
      .number()
      .positive("Orçamento deve ser maior que zero."),
    descricao: z.string().trim().min(1, "Descrição é obrigatória."),
  })
  .refine(
    (data) =>
      new Date(data.previsaoDeTermino).getTime() >=
      new Date(data.dataDeInicio).getTime(),
    {
      message:
        "A previsão de término deve ser maior ou igual à data de início.",
      path: ["previsaoDeTermino"],
    },
  );

export const changeStatusSchema = z.object({
  status: z.enum([
    "Em análise",
    "Aprovado",
    "Em andamento",
    "Encerrado",
    "Cancelado",
  ]),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
