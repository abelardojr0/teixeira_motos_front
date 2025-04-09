import { useEffect, useState } from 'react';
import { BoxInputMolecule } from '../../../components/Molecules/BoxInputMolecule';
import { SpinnerAtom } from '../../../components/Atoms/SpinnerAtom';
import { SubtitleAdd } from '../../../components/Molecules/SubtitleAdd';
import { ProdutoTable } from '../../../components/Organismos/TableProdutos';
import { useProdutos } from '../../../hooks/useProdutos';

export const Produtos = () => {
  const { produtos, buscarProdutos, loading, deletarProduto } = useProdutos();
  const [busca, setBusca] = useState('');
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const filteredProdutos = produtos?.filter((produto) => {
    if (!busca) return true;
    return (
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (produto.categoria?.toLowerCase().includes(busca.toLowerCase()) ?? false)
    );
  });

  return (
    <>
      {loading ? (
        <SpinnerAtom />
      ) : (
        <>
          <SubtitleAdd
            to="/produtos/form"
            text="Lista de Produtos"
            setSearch={setOnSearch}
          />
          {onSearch && (
            <BoxInputMolecule
              htmlFor="busca"
              id="busca"
              type="text"
              children=""
              placeholder="Buscar por Nome ou Categoria"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          )}
          <ProdutoTable
            produtos={filteredProdutos || []}
            onDelete={async (id) => {
              await deletarProduto(id); // Chama a função de deletar e remove o produto
              buscarProdutos(); // Recarrega a lista de produtos após a exclusão
            }}
          />
        </>
      )}
    </>
  );
};
