import { useEffect, useState } from "react";
import { SubtitleAdd } from "../../../components/Molecules/SubtitleAdd";
import { BoxInputMolecule } from "../../../components/Molecules/BoxInputMolecule";
import { SpinnerAtom } from "../../../components/Atoms/SpinnerAtom";
import { useServicos } from "../../../hooks/useServicos";
import { ServicoTable } from "../../../components/Organismos/TableServicos";

export const Servicos = () => {
  const { servicos, buscarServicos, deletarServico, loading } = useServicos();
  const [busca, setBusca] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    buscarServicos();
  }, []);

  const filtered = servicos?.filter((s) =>
    s.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return loading ? (
    <SpinnerAtom />
  ) : (
    <>
      <SubtitleAdd
        to="/servicos/form"
        text="Lista de Serviços"
        setSearch={setOnSearch}
      />
      {onSearch && (
        <BoxInputMolecule
          htmlFor="busca"
          id="busca"
          type="text"
          children=""
          placeholder="Buscar por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      )}
      <ServicoTable servicos={filtered} onDelete={deletarServico} />
    </>
  );
};
