import { z } from "zod";

export const vendaSchema = z.object({
  cliente_id: z.number({ required_error: "Cliente obrigatório" }),
  quantidade: z.string().refine((val) => Number(val) > 0, {
    message: "Quantidade deve ser maior que 0",
  }),
  produtoSelecionadoEstoque: z.number().optional(),
  itens: z
    .array(
      z.object({
        produto_id: z.string().min(1, "Produto obrigatório"),
        quantidade: z.string().refine((val) => Number(val) > 0, {
          message: "Quantidade deve ser maior que 0",
        }),
      })
    )
    .min(1, "Adicione ao menos um item"),
});
