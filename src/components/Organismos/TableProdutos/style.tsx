import styled from "styled-components";
import { ButtonAtom } from "../../Atoms/ButtonAtom";
import { ButtonSecundaryAtom } from "../../Atoms/ButtonSecudayAtom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #e7e6e6;

  th,
  td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }
`;

export const Th = styled.th``;
export const Td = styled.td``;

export const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled(ButtonAtom)`
  padding: 4px 8px;
  font-size: 12px;
`;

export const DeleteButton = styled(ButtonSecundaryAtom)`
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PrevIcon = styled(ArrowBackIosIcon)`
  font-size: 24px;
`;

export const NextIcon = styled(ArrowForwardIosIcon)`
  font-size: 24px;
`;

export const PageText = styled.span`
  margin: 0 10px;
  font-size: 16px;
`;
