import { useEffect, useState } from "react";
import { useProdutos } from "../../../hooks/useProdutos";
import { useVendas } from "../../../hooks/useVendas";
import { useClientes } from "../../../hooks/useClientes";
import { useServicos } from "../../../hooks/useServicos";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TitlePage } from "../../../utils/globalStyles";
import {
  BotaoAdd,
  ContainerCadastro,
  DivEstoque,
  DivProduto,
  DivServico,
  FormTurmaStyled,
} from "./style";

import { BoxInputMolecule } from "../../../components/Molecules/BoxInputMolecule";
import { ButtonAtom } from "../../../components/Atoms/ButtonAtom";
import { BuscaProduto } from "../../../components/Molecules/BuscaProduto";
import { BuscaCliente } from "../../../components/Molecules/BuscaCliente";

import { TabelaItensVenda } from "../../../components/Organismos/TabelaItensVenda";
import { BuscaServico } from "../../../components/Molecules/BuscarServicos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const vendaSchema = z.object({
  cliente_id: z
    .number({ required_error: "Cliente é obrigatório" })
    .min(1, "Selecione um cliente"),
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
        tipo: z.enum(["Produto", "Serviço"]), // <<<<<< AQUI
      })
    )
    .min(1, "Adicione ao menos um item"),
});

type VendaFormData = z.infer<typeof vendaSchema>;

export const VendaForm = () => {
  const { produtos, buscarProdutos } = useProdutos();
  const { clientes, buscarClientes } = useClientes();
  const { servicos, buscarServicos } = useServicos();
  const { realizarVenda } = useVendas();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm<VendaFormData>({
    resolver: zodResolver(vendaSchema),
    defaultValues: {
      cliente_id: undefined,
      quantidade: "1",
      produtoSelecionadoEstoque: undefined,
      itens: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const [buscaProduto, setBuscaProduto] = useState("");
  const [buscaCliente, setBuscaCliente] = useState("");
  const [buscaServico, setBuscaServico] = useState("");

  const itens = watch("itens");
  const quantidade = watch("quantidade");

  const produtoSelecionado = produtos.find((p) => p.nome === buscaProduto);
  const servicoSelecionado = servicos.find((s) => s.nome === buscaServico);

  const total = itens.reduce((acc, item) => {
    const produto = produtos.find((p) => p.id === Number(item.produto_id));
    const servico = servicos.find((s) => s.id === Number(item.produto_id));
    const qtd = Number(item.quantidade);
    const preco = produto?.preco || servico?.preco || 0;
    return acc + preco * qtd;
  }, 0);

  useEffect(() => {
    buscarProdutos();
    buscarClientes();
    buscarServicos();
  }, []);

  useEffect(() => {
    setValue("produtoSelecionadoEstoque", produtoSelecionado?.estoque || 0);
  }, [produtoSelecionado, setValue]);

  const handleAddItem = () => {
    if (!produtoSelecionado || produtoSelecionado.estoque === 0) return;

    const qtd = Number(quantidade);
    if (produtoSelecionado.estoque) {
      if (qtd > produtoSelecionado.estoque) return;
    }

    append({
      produto_id: String(produtoSelecionado.id),
      quantidade,
      tipo: "Produto", // <<<<<< AQUI
    });

    setBuscaProduto("");
    setValue("quantidade", "1");
  };

  const handleAddServico = () => {
    if (!servicoSelecionado) return;

    append({
      produto_id: String(servicoSelecionado.id),
      quantidade: "1",
      tipo: "Serviço", // <<<<<< AQUI
    });

    setBuscaServico("");
  };

  const onSubmit = async (data: VendaFormData) => {
    await realizarVenda({
      cliente_id: data.cliente_id,
      itens: data.itens.map((item) => ({
        item_id: item.produto_id,
        quantidade: Number(item.quantidade),
        type: item.tipo,
      })),
    });
  };

  return (
    <ContainerCadastro>
      <FormTurmaStyled onSubmit={handleSubmit(onSubmit)}>
        <TitlePage>Cadastrar Venda</TitlePage>
        <DivServico>
          <BuscaCliente
            clientes={clientes}
            termo={buscaCliente}
            setTermo={setBuscaCliente}
            onSelect={(cliente) => {
              setBuscaCliente(cliente.nome);
              setValue("cliente_id", Number(cliente.id));
            }}
          />
          {errors.cliente_id && (
            <p style={{ color: "red" }}>{errors.cliente_id.message}</p>
          )}
          <BuscaServico
            servicos={servicos}
            termo={buscaServico}
            setTermo={setBuscaServico}
            onSelect={(servico) => {
              setBuscaServico(servico.nome);
            }}
          />
          <BotaoAdd onClick={handleAddServico}>
            <AddCircleOutlineIcon />
          </BotaoAdd>
        </DivServico>

        <DivProduto>
          <BuscaProduto
            produtos={produtos}
            termo={buscaProduto}
            setTermo={setBuscaProduto}
            onSelect={(produto) => {
              setBuscaProduto(produto.nome);
              setValue("produtoSelecionadoEstoque", produto.estoque);
            }}
          />
          <DivEstoque>
            <BoxInputMolecule
              type="number"
              htmlFor="quantidade"
              id="quantidade"
              children="Quantidade"
              {...register("quantidade")}
              error={!!errors.quantidade}
              errorMessage={errors.quantidade?.message}
              min="1"
              max={produtoSelecionado?.estoque || ""}
            />
            {produtoSelecionado && <p>Estoque: {produtoSelecionado.estoque}</p>}
          </DivEstoque>
          <BotaoAdd onClick={handleAddItem}>
            <AddCircleOutlineIcon />
          </BotaoAdd>
          {produtoSelecionado?.estoque === 0 && (
            <p style={{ color: "red" }}>Este produto está sem estoque.</p>
          )}
        </DivProduto>

        <TabelaItensVenda
          itens={fields}
          produtos={[...produtos, ...servicos]}
          onChangeQuantidade={(index, novaQtd) =>
            setValue(`itens.${index}.quantidade`, novaQtd)
          }
          onRemoverItem={(index) => remove(index)}
        />

        {errors.itens && <p style={{ color: "red" }}>{errors.itens.message}</p>}

        <h3>Total: R$ {total.toFixed(2)}</h3>

        <ButtonAtom type="submit">Finalizar Venda</ButtonAtom>
      </FormTurmaStyled>
    </ContainerCadastro>
  );
};
