import styled from "styled-components";
import { ContainerAuth } from "../../../utils/globalStyles";
import responsive, { breakpoints } from "../../../utils/responsive";

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

export const DivQuantidades = styled.div`
  display: flex;
  gap: 16;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
