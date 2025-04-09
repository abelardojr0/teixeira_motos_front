import React, { useState, useEffect } from "react";
import { Servico } from "../../../utils/type";
import { ListaResultados, Wrapper } from "../BuscaProduto/style";
import { BoxInputMolecule } from "../BoxInputMolecule";

interface BuscaServicoProps {
  servicos: Servico[];
  onSelect: (servico: Servico) => void;
  termo: string;
  setTermo: (valor: string) => void;
}

const HISTORICO_KEY = "historico_busca_servico";

export const BuscaServico: React.FC<BuscaServicoProps> = ({
  servicos,
  onSelect,
  termo,
  setTermo,
}) => {
  const [resultados, setResultados] = useState<Servico[]>([]);
  const [focado, setFocado] = useState(false);
  const [historico, setHistorico] = useState<Servico[]>([]);

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

    const filtrados = servicos.filter((s) =>
      s.nome.toLowerCase().includes(termo.toLowerCase())
    );

    setResultados(filtrados);
  }, [termo, servicos, historico]);

  const handleSelect = (servico: Servico) => {
    setTermo(servico.nome);
    setResultados([]);
    onSelect(servico);

    setHistorico((prev) => {
      const atualizado = [servico, ...prev.filter((s) => s.id !== servico.id)];
      const limitado = atualizado.slice(0, 5);
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(limitado));
      return limitado;
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && resultados.length > 0) {
      handleSelect(resultados[0]);
    }
  };

  return (
    <Wrapper>
      <BoxInputMolecule
        type="text"
        htmlFor="busca-servico"
        id="busca-servico"
        children="Serviço"
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
          {resultados.map((servico) => (
            <li key={servico.id} onClick={() => handleSelect(servico)}>
              {servico.nome} — R$ {Number(servico.preco).toFixed(2)}
            </li>
          ))}
        </ListaResultados>
      )}
    </Wrapper>
  );
};
