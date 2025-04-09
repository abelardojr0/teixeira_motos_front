import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  ContainerSection,
  Direitos,
  DropdownItem,
  DropdownMenu,
  FooterContainer,
  HeaderList,
  HeaderListItemText,
  HeaderLogoStyled,
  HeaderStyled,
  ProfileContainer,
  ProfileIcon,
} from "./style";
import HomeIcon from "@mui/icons-material/Home";
import SellIcon from "@mui/icons-material/Sell";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuIcon from "@mui/icons-material/Menu";
import ConstructionIcon from "@mui/icons-material/Construction";

import { cloneElement, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";

export const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const itens = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Produtos", path: "/produtos", icon: <SportsMotorsportsIcon /> },
    { text: "Vendas", path: "/vendas", icon: <SellIcon /> },
    { text: "Clientes", path: "/clientes", icon: <PeopleAltIcon /> },
    { text: "Serviços", path: "/servicos", icon: <ConstructionIcon /> },
  ];

  const [open, setOpen] = useState<boolean>(true);
  const [checkSize, setCheckSize] = useState<boolean>();
  const [menuAberto, setMenuAberto] = useState(false);

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const auth = useContext(AuthContext);

  const dropdownRef: any = useRef(null);
  const profileIconRef: any = useRef(null);
  const menuRef: any = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setOpen(false);
        setCheckSize(false);
      } else {
        setOpen(true);
        setCheckSize(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (auth.user) {
      const userName = auth.user?.nome || "";
      const nameParts = userName.split(" ");
      const initials =
        nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : "");
      setUser({
        name: userName,
        initials: initials.toUpperCase(),
      });
    }
  }, [auth.user]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        checkSize === false
      ) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, [checkSize]);

  return (
    <>
      <Container>
        <HeaderStyled className={open ? "" : "desativo"}>
          <HeaderLogoStyled className={open ? "" : "desativo"} to={"/"}>
            <img src={logo} alt="Logo" />
          </HeaderLogoStyled>

          <nav>
            {checkSize === false && (
              <MenuIcon
                style={{ marginRight: "15px" }}
                onClick={() => setMenuAberto(!menuAberto)}
              />
            )}

            {(open || menuAberto) && (
              <HeaderList
                ref={checkSize === false && menuAberto ? menuRef : null}
                className={checkSize === false ? "mobile" : ""}
              >
                {itens.map((item) => (
                  <li key={item.path}>
                    <HeaderListItemText
                      className={currentPath === item.path ? "ativo" : ""}
                      to={item.path}
                      onClick={() => setMenuAberto(false)}
                    >
                      {item.icon &&
                        cloneElement(item.icon, {
                          className: currentPath === item.path ? "ativo" : "",
                        })}
                      {checkSize && item.text}
                    </HeaderListItemText>
                  </li>
                ))}
                <ProfileContainer>
                  <ProfileIcon ref={profileIconRef} onClick={toggleDropdown}>
                    {user?.initials}
                  </ProfileIcon>
                  {isDropdownOpen && (
                    <DropdownMenu ref={dropdownRef}>
                      <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                    </DropdownMenu>
                  )}
                </ProfileContainer>
              </HeaderList>
            )}
          </nav>
        </HeaderStyled>

        <ContainerSection>
          <Outlet />
        </ContainerSection>
        <FooterContainer>
          <Direitos>
            <p>© 2025 · Todos os direitos reservados.</p>
            <p>Criado e Desenvolvido por Abelardo Júnior</p>
          </Direitos>
        </FooterContainer>
      </Container>
    </>
  );
};
