import {
  BoxDash,
  ContainerDash,
  DashEstruturaCabecalho,
  DashEstruturaCorpo,
  DashEstruturaLogin,
  DashLogo,
} from './style';
import logo from '../../../assets/logo.png';
import { Login } from '../Login';
export const Home = () => {
  return (
    <ContainerDash>
      <DashEstruturaCabecalho>
        <DashLogo src={logo} />
      </DashEstruturaCabecalho>

      <DashEstruturaCorpo>
        <DashEstruturaLogin>
          <BoxDash>
            <Login />
          </BoxDash>
        </DashEstruturaLogin>
      </DashEstruturaCorpo>
    </ContainerDash>
  );
};
