import styled from "styled-components";
import { cores } from "../../../utils/theme";
import responsive, { breakpoints } from "../../../utils/responsive";

export const TextareaAtomStyled = styled.textarea<{ error?: boolean }>`
  border: 2px solid ${(props) => (props.error ? "red" : cores.cor_destaque)};
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  font-size: 22px;
  resize: vertical;
  min-height: 80px;
  &:focus {
    border-color: ${(props) => (props.error ? "red" : cores.cor_principal)};
  }
  ${responsive(breakpoints.mobile)} {
    font-size: 16px;
  }
`;
