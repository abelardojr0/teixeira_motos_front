import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonAtom } from "../../../components/Atoms/ButtonAtom";
import { BoxInputMolecule } from "../../../components/Molecules/BoxInputMolecule";
import { TitlePage } from "../../../utils/globalStyles";
import { ContainerCadastro, FormTurmaStyled } from "../../Produtos/Form/style";
import { useClientes } from "../../../hooks/useClientes";
import { clienteSchema } from "../../../schemas/clientes";
import { BoxTextareaMolecule } from "../../../components/Molecules/TextAreaMolecule";

export const ClienteForm = () => {
  const { id } = useParams();
  const { cliente, buscarCliente, atualizarCliente, cadastrarCliente } =
    useClientes();
  const formatarCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatarTelefone = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15); // Limita o tamanho
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      cpf: "",
      endereco: "",
      observacoes: "",
    },
  });

  useEffect(() => {
    if (id) buscarCliente(id);
  }, [id]);

  useEffect(() => {
    if (id && cliente) {
      reset({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email || "",
        cpf: cliente.cpf || "",
        endereco: cliente.endereco || "",
        observacoes: cliente.observacoes || "",
      });
    }
  }, [id, cliente, reset]);

  const onSubmit = async (data: any) => {
    if (id) {
      await atualizarCliente(id, data);
    } else {
      await cadastrarCliente(data);
    }
  };

  return (
    <ContainerCadastro>
      <TitlePage>{id ? "Editar Cliente" : "Cadastrar Cliente"}</TitlePage>
      <FormTurmaStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="text"
          htmlFor="nome"
          id="nome"
          children="Nome do Cliente"
          {...register("nome")}
          error={!!errors.nome}
          errorMessage={errors.nome?.message}
        />
        <BoxInputMolecule
          type="text"
          htmlFor="telefone"
          id="telefone"
          children="Telefone"
          {...register("telefone")}
          onChange={(e) => {
            e.target.value = formatarTelefone(e.target.value);
          }}
          error={!!errors.telefone}
          errorMessage={errors.telefone?.message}
        />

        <BoxInputMolecule
          type="email"
          htmlFor="email"
          id="email"
          children="Email"
          {...register("email")}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <BoxInputMolecule
          type="text"
          htmlFor="cpf"
          id="cpf"
          children="CPF"
          {...register("cpf")}
          onChange={(e) => {
            e.target.value = formatarCPF(e.target.value);
          }}
          error={!!errors.cpf}
          errorMessage={errors.cpf?.message}
        />

        <BoxInputMolecule
          type="text"
          htmlFor="endereco"
          id="endereco"
          children="Endereço"
          {...register("endereco")}
          error={!!errors.endereco}
          errorMessage={errors.endereco?.message}
          fullWidth
        />
        <BoxTextareaMolecule
          htmlFor="observacoes"
          id="observacoes"
          children="Observações"
          {...register("observacoes")}
          error={!!errors.observacoes}
          errorMessage={errors.observacoes?.message}
          fullWidth
        />

        <ButtonAtom fullWidth disabled={isSubmitting}>
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
