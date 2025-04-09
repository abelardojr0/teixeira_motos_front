import styled from "styled-components";
import { cores } from "../../../utils/theme";
import responsive, { breakpoints } from "../../../utils/responsive";

export const BoxInputMoleculeStyled = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  gap: 8px;
  flex-direction: column;
  color: ${cores.cor_secundaria};
  min-width: 200px;

  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  ${(props) => props.fullWidth && "grid-column: 1 / -1;"}
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const InputAtomStyled = styled.input<{ error?: boolean }>`
  border: 2px solid ${(props) => (props.error ? "red" : cores.cor_destaque)};
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  font-size: 22px;
  &:focus {
    border-color: ${(props) => (props.error ? "red" : cores.cor_principal)};
  }
  ${responsive(breakpoints.mobile)} {
    font-size: 16px;
  }
`;

export const LabelAtomStyled = styled.label`
  font-size: 18px;
  font-weight: 800;
  ${responsive(breakpoints.mobile)} {
    font-size: 16px;
  }
`;
