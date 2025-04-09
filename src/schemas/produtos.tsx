import { z } from 'zod';

export const produtoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  marca: z.string().optional(),
  categoria: z.string().optional(),
  estoque: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Estoque deve ser 0 ou mais',
    ), // Tratamento de estoque como string
  preco: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Preço deve ser 0 ou mais',
    ), // Tratamento de preço como string
  custo: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      'Custo deve ser 0 ou mais',
    ), // Custo como string
});
