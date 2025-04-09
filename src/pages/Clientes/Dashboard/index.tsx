import { useEffect, useState } from "react";
import { BoxInputMolecule } from "../../../components/Molecules/BoxInputMolecule";
import { SpinnerAtom } from "../../../components/Atoms/SpinnerAtom";
import { SubtitleAdd } from "../../../components/Molecules/SubtitleAdd";
import { useClientes } from "../../../hooks/useClientes";
import { ClienteTable } from "../../../components/Organismos/TableClientes";

export const Clientes = () => {
  const { clientes, buscarClientes, loading, deletarCliente } = useClientes();
  const [busca, setBusca] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    buscarClientes();
  }, []);

  const filteredClientes = clientes?.filter((cliente) => {
    if (!busca) return true;
    const termo = busca.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpf?.toLowerCase().includes(termo) ||
      cliente.telefone?.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      {loading ? (
        <SpinnerAtom />
      ) : (
        <>
          <SubtitleAdd
            to="/clientes/form"
            text="Lista de Clientes"
            setSearch={setOnSearch}
          />
          {onSearch && (
            <BoxInputMolecule
              htmlFor="busca"
              id="busca"
              type="text"
              children=""
              placeholder="Buscar por Nome, CPF ou Telefone"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          )}
          <ClienteTable
            clientes={filteredClientes || []}
            onDelete={async (id) => {
              await deletarCliente(id);
              buscarClientes();
            }}
          />
        </>
      )}
    </>
  );
};
