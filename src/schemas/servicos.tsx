import { z } from "zod";

export const servicoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  preco: z
    .string()
    .refine((val) => Number(val) > 0, {
      message: "Preço deve ser maior que 0",
    }),
  observacoes: z.string().optional(),
});
