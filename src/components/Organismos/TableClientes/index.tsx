import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { Cliente } from "../../../utils/type";

interface ClienteTableProps {
  clientes: Cliente[];
  onDelete: (id: string | undefined) => void;
}

export const ClienteTable: React.FC<ClienteTableProps> = ({
  clientes,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastCliente = currentPage * itemsPerPage;
  const indexOfFirstCliente = indexOfLastCliente - itemsPerPage;
  const currentClientes = clientes.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  const totalPages = Math.ceil(clientes.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
            <Th>Email</Th>
            <Th>CPF</Th>
            <Th>Endereço</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {currentClientes.map((cliente) => (
            <tr key={cliente.id}>
              <Td>{cliente.nome}</Td>
              <Td>{cliente.telefone}</Td>
              <Td>{cliente.email || "-"}</Td>
              <Td>{cliente.cpf || "-"}</Td>
              <Td>{cliente.endereco || "-"}</Td>
              <Td>
                <ActionContainer>
                  <Link to={`/clientes/form/${cliente.id}`}>
                    <EditButton>Editar</EditButton>
                  </Link>
                  <DeleteButton onClick={() => onDelete(String(cliente?.id))}>
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
