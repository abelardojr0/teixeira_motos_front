import styled from "styled-components";
import { ContainerAuth } from "../../../utils/globalStyles";
import responsive, { breakpoints } from "../../../utils/responsive";
import { cores } from "../../../utils/theme";

// export const FormTurmaStyled = styled.form`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 15px;
//   margin-top: 20px;
//   ${responsive(breakpoints.tablet)} {
//     grid-template-columns: 1fr;
//   }
//   background-color: white;
//   border-radius: 20px;
//   padding: 30px;
// `;

export const FormTurmaStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 20px;
  overflow: hidden;
  max-width: 60vw;
  width: 100%;

  margin-left: auto;
  margin-right: auto;

  background-color: white;
  border-radius: 20px;
  padding: 30px;

  > * {
    max-width: 100%;
  }

  ${responsive(breakpoints.tablet)} {
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 600px;
  }
`;

export const ContainerCadastro = styled(ContainerAuth)`
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const DivProduto = styled.div`
  display: grid;
  grid-template-columns: 3fr 200px 100px;
  gap: 20px;
  width: 100%;
`;

export const DivServico = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 100px;
  gap: 20px;
  width: 100%;
`;

export const DivEstoque = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const BotaoAdd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  & svg {
    font-size: 50px;
    cursor: pointer;
    background-color: ${cores.cor_principal};
    color: white;
    border-radius: 50%;
    padding: 5px;
    ${responsive(breakpoints.tablet)} {
      font-size: 30px;
    }
  }
`;
