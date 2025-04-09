import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoxInputMolecule } from "../../../components/Molecules/BoxInputMolecule";
import { ButtonAtom } from "../../../components/Atoms/ButtonAtom";
import { TitlePage } from "../../../utils/globalStyles";
import { useServicos } from "../../../hooks/useServicos";
import { servicoSchema } from "../../../schemas/servicos";
import { ContainerCadastro, FormTurmaStyled } from "../../Produtos/Form/style";

export const ServicoForm = () => {
  const { id } = useParams();
  const { cadastrarServico, atualizarServico, buscarServico, servico } =
    useServicos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(servicoSchema),
    defaultValues: {
      nome: "",
      preco: "",
      observacoes: "",
    },
  });

  useEffect(() => {
    if (id) buscarServico(id);
  }, [id]);

  useEffect(() => {
    if (id && servico) {
      reset({
        nome: servico.nome,
        preco: String(servico.preco),
        observacoes: servico.observacoes || "",
      });
    }
  }, [id, servico, reset]);

  const onSubmit = async (data: any) => {
    const dados = {
      nome: data.nome,
      preco: Number(data.preco),
      observacoes: data.observacoes,
    };
    if (id) {
      await atualizarServico(id, dados);
    } else {
      await cadastrarServico(dados);
    }
  };

  return (
    <ContainerCadastro>
      <TitlePage>{id ? "Editar Serviço" : "Cadastrar Serviço"}</TitlePage>
      <FormTurmaStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="text"
          htmlFor="nome"
          id="nome"
          children="Nome"
          {...register("nome")}
          error={!!errors.nome}
          errorMessage={errors.nome?.message}
        />
        <BoxInputMolecule
          type="number"
          htmlFor="preco"
          id="preco"
          children="Preço"
          step="any"
          {...register("preco")}
          error={!!errors.preco}
          errorMessage={errors.preco?.message}
        />
        <BoxInputMolecule
          type="text"
          htmlFor="observacoes"
          id="observacoes"
          children="Observações"
          {...register("observacoes")}
          error={!!errors.observacoes}
          errorMessage={errors.observacoes?.message}
        />
        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting
            ? id
              ? "Salvando..."
              : "Cadastrando..."
            : id
            ? "Salvar Alterações"
            : "Cadastrar"}
        </ButtonAtom>
      </FormTurmaStyled>
    </ContainerCadastro>
  );
};
