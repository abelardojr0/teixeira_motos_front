import { useState } from "react";
import { Venda } from "../../../utils/type";
import {
  EditButton,
  StyledTable,
  TableWrapper,
  Td,
  Th as BaseTh,
  PaginationContainer,
  PaginationButton,
  PrevIcon,
  PageText,
  NextIcon,
  DeleteButton,
} from "../TableProdutos/style";
import styled from "styled-components";
import { ModalNotaFiscal } from "../ModalNotaFiscal";
import { useVendas } from "../../../hooks/useVendas";

interface VendaTableProps {
  vendas: Venda[];
}

const Th = styled(BaseTh)`
  cursor: pointer;
`;

export const VendaTable: React.FC<VendaTableProps> = ({ vendas }) => {
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);
  const [ordem, setOrdem] = useState<{
    campo: "cliente" | "total" | "createdAt";
    direcao: "asc" | "desc";
  }>({
    campo: "createdAt",
    direcao: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { excluirVenda, listarVendas } = useVendas();

  const ordenar = (campo: "cliente" | "total" | "createdAt") => {
    setOrdem((prev) => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === "asc" ? "desc" : "asc",
    }));
  };

  const vendasOrdenadas = [...vendas].sort((a, b) => {
    let valorA: any, valorB: any;

    switch (ordem.campo) {
      case "cliente":
        valorA = a.cliente?.nome?.toLowerCase() || "";
        valorB = b.cliente?.nome?.toLowerCase() || "";
        break;
      case "total":
        valorA = a.total;
        valorB = b.total;
        break;
      case "createdAt":
        valorA = new Date(a.createdAt!).getTime();
        valorB = new Date(b.createdAt!).getTime();
        break;
    }

    if (valorA < valorB) return ordem.direcao === "asc" ? -1 : 1;
    if (valorA > valorB) return ordem.direcao === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastVenda = currentPage * itemsPerPage;
  const indexOfFirstVenda = indexOfLastVenda - itemsPerPage;
  const currentVendas = vendasOrdenadas.slice(
    indexOfFirstVenda,
    indexOfLastVenda
  );

  const totalPages = Math.ceil(vendas.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderSeta = (campo: "cliente" | "total" | "createdAt") => {
    if (ordem.campo === campo) {
      return ordem.direcao === "asc" ? "🔼" : "🔽";
    }
    return "🔽";
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta venda?")) {
      await excluirVenda(id);
      await listarVendas();
    }
  };

  return (
    <>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th onClick={() => ordenar("cliente")}>
                Cliente {renderSeta("cliente")}
              </Th>
              <Th onClick={() => ordenar("total")}>
                Total {renderSeta("total")}
              </Th>
              <Th onClick={() => ordenar("createdAt")}>
                Data {renderSeta("createdAt")}
              </Th>
              <BaseTh>Hora</BaseTh>
              <BaseTh>Ações</BaseTh>
            </tr>
          </thead>
          <tbody>
            {currentVendas.map((venda) => {
              const dataVenda = new Date(venda.createdAt!);
              return (
                <tr key={venda.id}>
                  <Td>{venda.cliente?.nome || "—"}</Td>
                  <Td>R$ {Number(venda.total).toFixed(2)}</Td>
                  <Td>{dataVenda.toLocaleDateString()}</Td>
                  <Td>{dataVenda.toLocaleTimeString()}</Td>
                  <Td style={{ display: "flex", gap: 15 }}>
                    <EditButton
                      type="button"
                      onClick={() => setVendaSelecionada(venda)}
                    >
                      Ver detalhes
                    </EditButton>
                    <DeleteButton
                      type="button"
                      onClick={() => handleDelete(Number(venda.id))}
                    >
                      Excluir
                    </DeleteButton>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </TableWrapper>

      {vendaSelecionada && (
        <ModalNotaFiscal
          venda={vendaSelecionada}
          onClose={() => setVendaSelecionada(null)}
        />
      )}

      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <PrevIcon />
        </PaginationButton>
        <PageText>
          Página {currentPage} de {totalPages}
        </PageText>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <NextIcon />
        </PaginationButton>
      </PaginationContainer>
    </>
  );
};
