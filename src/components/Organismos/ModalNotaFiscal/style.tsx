import styled from "styled-components";
import { ButtonAtom } from "../../Atoms/ButtonAtom";
import { cores } from "../../../utils/theme";
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  padding: 28px;
  border-radius: 10px;
  width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.3);
  font-family: "Courier New", Courier, monospace;
  position: relative;
`;

export const HeaderNota = styled.div`
  text-align: center;
  margin-bottom: 16px;
  h2 {
    margin-bottom: 4px;
    font-size: 20px;
  }
  span {
    display: block;
    font-size: 12px;
  }
`;

export const TabelaNota = styled.table`
  width: 100%;
  margin-top: 18px;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 6px 8px;
    text-align: left;
  }

  th {
    background-color: #f9f9f9;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
  }

  tr:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

export const TotalNota = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ButtomClose = styled(ButtonAtom)`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: ${cores.cor_principal};
  box-shadow: none;
  &:hover {
    transform: scale(1.01);
  }
`;
