import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonAtom } from '../../../components/Atoms/ButtonAtom';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { TitlePage } from '../../../utils/globalStyles';
import { ContainerCadastro, FormTurmaStyled } from './style';
import { produtoSchema } from '../../../schemas/produtos';
import { useProdutos } from '../../../hooks/useProdutos';

export const ProdutoForm = () => {
  const { id } = useParams();
  const { produto, buscarProduto, atualizarProduto, cadastrarProduto } =
    useProdutos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      marca: '',
      categoria: '',
      estoque: '0', // Inicializando estoque como string
      preco: '0', // Inicializando preço como string
      custo: '0', // Inicializando custo como string
    },
  });

  useEffect(() => {
    if (id) buscarProduto(id);
  }, [id]);

  useEffect(() => {
    if (id && produto) {
      reset({
        nome: produto.nome,
        descricao: produto.descricao || '',
        marca: produto.marca || '',
        categoria: produto.categoria || '',
        estoque: String(produto.estoque || 0), // Garantindo que estoque seja string
        preco: String(produto.preco || 0), // Garantindo que preço seja string
        custo: String(produto.custo || 0), // Garantindo que custo seja string
      });
    }
  }, [id, produto, reset]);

  const onSubmit = async (data: any) => {
    // Convertendo os valores de string para number antes de enviar
    const dadosFormatados = {
      ...data,
      estoque: Number(data.estoque),
      preco: Number(data.preco),
      custo: data.custo ? Number(data.custo) : undefined, // Garantindo que custo seja tratado como número ou undefined
    };

    if (id) {
      await atualizarProduto(id, dadosFormatados);
    } else {
      await cadastrarProduto(dadosFormatados);
    }
  };

  return (
    <ContainerCadastro>
      <TitlePage>{id ? 'Editar Produto' : 'Cadastrar Produto'}</TitlePage>
      <FormTurmaStyled onSubmit={handleSubmit(onSubmit)}>
        <BoxInputMolecule
          type="text"
          htmlFor="nome"
          id="nome"
          children="Nome do Produto"
          {...register('nome')}
          error={!!errors.nome}
          errorMessage={errors.nome?.message}
        />
        <BoxInputMolecule
          type="text"
          htmlFor="descricao"
          id="descricao"
          children="Descrição"
          {...register('descricao')}
          error={!!errors.descricao}
          errorMessage={errors.descricao?.message}
        />
        <BoxInputMolecule
          type="text"
          htmlFor="marca"
          id="marca"
          children="Marca"
          {...register('marca')}
          error={!!errors.marca}
          errorMessage={errors.marca?.message}
        />
        <BoxInputMolecule
          type="text"
          htmlFor="categoria"
          id="categoria"
          children="Categoria"
          {...register('categoria')}
          error={!!errors.categoria}
          errorMessage={errors.categoria?.message}
        />
        <BoxInputMolecule
          type="number"
          htmlFor="estoque"
          id="estoque"
          children="Estoque"
          {...register('estoque')}
          error={!!errors.estoque}
          errorMessage={errors.estoque?.message}
        />
        <BoxInputMolecule
          type="number"
          htmlFor="preco"
          id="preco"
          children="Preço"
          step="any"
          {...register('preco')}
          error={!!errors.preco}
          errorMessage={errors.preco?.message}
        />

        <BoxInputMolecule
          type="number"
          htmlFor="custo"
          id="custo"
          children="Preço"
          step="any"
          {...register('custo')}
          error={!!errors.custo}
          errorMessage={errors.custo?.message}
        />

        <ButtonAtom disabled={isSubmitting}>
          {isSubmitting
            ? id
              ? 'Salvando...'
              : 'Cadastrando...'
            : id
            ? 'Salvar Alterações'
            : 'Cadastrar'}
        </ButtonAtom>
      </FormTurmaStyled>
    </ContainerCadastro>
  );
};
