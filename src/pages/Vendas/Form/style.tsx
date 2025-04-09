import styled from 'styled-components';
import responsive, { breakpoints } from '../../../utils/responsive';
import { ContainerAuth } from '../../../utils/globalStyles';

export const FormTurmaStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 20px;
  width: 65vw;
  ${responsive(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
  background-color: white;
  border-radius: 20px;
  padding: 30px;
`;

export const ContainerCadastro = styled(ContainerAuth)`
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
