import styled from "styled-components";
import { cores } from "../../../utils/theme";
import responsive, { breakpoints } from "../../../utils/responsive";
interface ButtonProps {
  fullWidth?: boolean;
}

export const ButtonAtomStyled = styled.button<ButtonProps>`
  border: none;
  border-radius: 8px;
  background-color: ${cores.cor_principal};
  color: ${cores.texto_base};
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};

  &:hover {
    transform: scale(1.03);
  }

  &:disabled {
    background-color: ${cores.desativado};
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    box-shadow: none;
    transform: scale(1);
  }

  ${responsive(breakpoints.mobile)} {
    font-size: 18px;
  }
`;
