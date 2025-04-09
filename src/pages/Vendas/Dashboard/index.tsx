import { useEffect, useState } from "react";
import { BoxInputMolecule } from "../../../components/Molecules/BoxInputMolecule";
import { useVendas } from "../../../hooks/useVendas";
import { SpinnerAtom } from "../../../components/Atoms/SpinnerAtom";
import { SubtitleAdd } from "../../../components/Molecules/SubtitleAdd";
import { VendaTable } from "../../../components/Organismos/TableVendas";

export const Vendas = () => {
  const { vendas, listarVendas } = useVendas();
  const [busca, setBusca] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarVendas = async () => {
      setLoading(true);
      await listarVendas();
      setLoading(false);
    };
    carregarVendas();
  }, []);

  const filteredVendas = vendas?.filter((venda) => {
    if (!busca) return true;
    return (
      venda.cliente.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      venda.id?.toString().includes(busca)
    );
  });

  return (
    <>
      {loading ? (
        <SpinnerAtom />
      ) : (
        <>
          <SubtitleAdd
            to="/vendas/form"
            text="Lista de Vendas"
            setSearch={setOnSearch}
          />
          {onSearch && (
            <BoxInputMolecule
              htmlFor="busca"
              id="busca"
              type="text"
              children=""
              placeholder="Buscar por Cliente ou ID"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          )}
          <VendaTable vendas={filteredVendas || []} />
        </>
      )}
    </>
  );
};
