import React, { useState } from "react";
import {
  TableWrapper,
  StyledTable,
  Th,
  Td,
  ActionContainer,
  EditButton,
  DeleteButton,
  PaginationContainer,
  PaginationButton,
  PrevIcon,
  PageText,
  NextIcon,
} from "../TableProdutos/style";
import { Servico } from "../../../utils/type";
import { Link } from "react-router-dom";

interface ServicoTableProps {
  servicos: Servico[];
  onDelete: (id: string | undefined) => void;
}

export const ServicoTable: React.FC<ServicoTableProps> = ({
  servicos,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = servicos.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(servicos.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Observações</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((servico) => (
            <tr key={servico.id}>
              <Td>{servico.nome}</Td>
              <Td>R$ {Number(servico.preco).toFixed(2)}</Td>
              <Td>{servico.observacoes || "-"}</Td>
              <Td>
                <ActionContainer>
                  <Link to={`/servicos/form/${servico.id}`}>
                    <EditButton>Editar</EditButton>
                  </Link>
                  <DeleteButton onClick={() => onDelete(String(servico.id))}>
                    Excluir
                  </DeleteButton>
                </ActionContainer>
              </Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

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
    </TableWrapper>
  );
};
