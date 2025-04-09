import React, { useState, useEffect } from "react";
import { Cliente } from "../../../utils/type";
import { ListaResultados, Wrapper } from "../BuscaProduto/style";
import { BoxInputMolecule } from "../BoxInputMolecule";

interface BuscaClienteProps {
  clientes: Cliente[];
  onSelect: (cliente: Cliente) => void;
  termo: string;
  setTermo: (valor: string) => void;
}

const HISTORICO_KEY = "historico_busca_cliente";

export const BuscaCliente: React.FC<BuscaClienteProps> = ({
  clientes,
  onSelect,
  termo,
  setTermo,
}) => {
  const [resultados, setResultados] = useState<Cliente[]>([]);
  const [focado, setFocado] = useState(false);
  const [historico, setHistorico] = useState<Cliente[]>([]);

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

    const filtrados = clientes.filter((c) =>
      c.nome.toLowerCase().includes(termo.toLowerCase())
    );

    setResultados(filtrados);
  }, [termo, clientes, historico]);

  const handleSelect = (cliente: Cliente) => {
    setTermo(cliente.nome);
    setResultados([]);
    onSelect(cliente);

    const atualizado = [
      cliente,
      ...historico.filter((c) => c.id !== cliente.id),
    ];
    const limitado = atualizado.slice(0, 5);
    setHistorico(limitado);
    localStorage.setItem(HISTORICO_KEY, JSON.stringify(limitado));
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
        htmlFor="busca-cliente"
        id="busca-cliente"
        children="Cliente"
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
          {resultados.map((cliente) => (
            <li key={cliente.id} onClick={() => handleSelect(cliente)}>
              {cliente.nome}
            </li>
          ))}
        </ListaResultados>
      )}
    </Wrapper>
  );
};
