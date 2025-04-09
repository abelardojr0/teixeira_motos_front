import styled from "styled-components";

export const TabelaContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Tabela = styled.table`
  width: 100%;
  min-width: 500px; /* impede quebra total da tabela */
  border-collapse: collapse;
  font-size: 0.9rem;
  table-layout: fixed; /* evita crescimento descontrolado */

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
    word-break: break-word; /* quebra o texto se estiver grande */
  }

  th {
    background-color: #f8f8f8;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  input[type="number"] {
    width: 60px;
    padding: 4px;
  }
`;

export const RemoverButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;
