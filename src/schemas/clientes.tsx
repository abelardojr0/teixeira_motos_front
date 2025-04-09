import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  cpf: z.string().optional().or(z.literal("")),
  endereco: z.string().optional().or(z.literal("")),
  observacoes: z.string().optional().or(z.literal("")),
});
