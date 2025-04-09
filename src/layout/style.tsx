import { Link } from "react-router-dom";
import styled from "styled-components";
import { cores } from "../utils/theme";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle,
    rgba(160, 160, 160, 1) 0%,
    rgba(26, 26, 26, 1) 100%
  );
`;

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: transparent;
  backdrop-filter: blur(5px);
  width: 100%;
  padding: 20px;
  transition: 0.4s ease-in-out;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & svg {
    color: ${cores.cor_principal};
    font-size: 35px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${cores.cor_secundaria};
    }
  }
`;

export const HeaderLogoStyled = styled(Link)`
  align-self: center;
  img {
    max-width: 120px;
  }
`;

export const HeaderList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  &.mobile {
    position: absolute;
    top: 80px;
    right: 20px;
    background: ${cores.fundo_base};
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
`;

export const HeaderListItemText = styled(Link)`
  color: ${cores.cor_principal};
  text-decoration: none;
  font-size: 24px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    color: ${cores.texto_base};
    & svg {
      color: ${cores.texto_base};
    }
  }
  &.ativo {
    color: ${cores.texto_base};
    & svg {
      color: ${cores.texto_base};
    }
  }
`;

export const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
`;

export const ProfileIcon = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${cores.cor_principal};
  color: ${cores.cor_principal};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  border-radius: 8px;
  padding: 10px 0;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  color: #333;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const UserNameDisplay = styled.div`
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: default;
`;
