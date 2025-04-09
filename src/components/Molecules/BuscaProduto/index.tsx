import React, { useState, useEffect } from 'react';
import { Produto } from '../../../utils/type';
import { ListaResultados, Wrapper } from './style';
import { BoxInputMolecule } from '../BoxInputMolecule';

interface BuscaProdutoProps {
  produtos: Produto[];
  onSelect: (produto: Produto) => void;
  termo: string;
  setTermo: (valor: string) => void;
}

const HISTORICO_KEY = 'historico_busca_produto';

export const BuscaProduto: React.FC<BuscaProdutoProps> = ({
  produtos,
  onSelect,
  termo,
  setTermo,
}) => {
  const [resultados, setResultados] = useState<Produto[]>([]);
  const [focado, setFocado] = useState(false);
  const [historico, setHistorico] = useState<Produto[]>([]);

  useEffect(() => {
    const h = localStorage.getItem(HISTORICO_KEY);
    if (h) {
      setHistorico(JSON.parse(h));
    }
  }, []);

  useEffect(() => {
    if (termo.trim().length === 0) {
      setResultados(historico);
      return;
    }

    const filtrados = produtos.filter((p) =>
      p.nome.toLowerCase().includes(termo.toLowerCase()),
    );

    setResultados(filtrados);
  }, [termo, produtos, historico]);

  const handleSelect = (produto: Produto) => {
    setTermo(produto.nome);
    setResultados([]);
    onSelect(produto);

    // Atualiza histórico
    setHistorico((prev) => {
      const atualizado = [produto, ...prev.filter((p) => p.id !== produto.id)];
      const limitado = atualizado.slice(0, 5); // mantém no máximo 5
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(limitado));
      return limitado;
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && resultados.length > 0) {
      handleSelect(resultados[0]);
    }
  };

  return (
    <Wrapper>
      <BoxInputMolecule
        type="text"
        htmlFor="busca-produto"
        id="busca-produto"
        children="Produto"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        onFocus={() => setFocado(true)}
        onBlur={() => setTimeout(() => setFocado(false), 200)}
        onKeyDown={handleEnter}
      />
      {focado && resultados.length > 0 && (
        <ListaResultados>
          {termo.trim().length === 0 && (
            <li>
              <em>Busca recente</em>
            </li>
          )}
          {resultados.map((produto) => (
            <li key={produto.id} onClick={() => handleSelect(produto)}>
              {produto.nome} — R$ {Number(produto.preco).toFixed(2)}
            </li>
          ))}
        </ListaResultados>
      )}
    </Wrapper>
  );
};

