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
} from "./style";
import { Produto } from "../../../utils/type";

interface ProdutoTableProps {
  produtos: Produto[];
  onDelete: (id: string | undefined) => void;
}

export const ProdutoTable: React.FC<ProdutoTableProps> = ({
  produtos,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = produtos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(produtos.length / itemsPerPage);

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
            <Th>Marca</Th>
            <Th>Categoria</Th>
            <Th>Estoque</Th>
            <Th>Preço</Th>
            <Th>Custo</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((produto) => (
            <tr key={produto.id}>
              <Td>{produto.nome}</Td>
              <Td>{produto.marca}</Td>
              <Td>{produto.categoria}</Td>
              <Td>
                {produto.estoque && produto.estoque < 5
                  ? `${produto.estoque} ⚠️`
                  : produto.estoque}
              </Td>
              <Td>R$ {Number(produto.preco).toFixed(2)}</Td>
              <Td>
                R$ {produto.custo ? Number(produto.custo).toFixed(2) : "-"}
              </Td>
              <Td>
                <ActionContainer>
                  <Link to={`/produtos/form/${produto.id}`}>
                    <EditButton>Editar</EditButton>
                  </Link>
                  <DeleteButton onClick={() => onDelete(String(produto?.id))}>
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
